from transformers import T5ForConditionalGeneration, T5Tokenizer, pipeline
import nltk

nltk.download('punkt')
from nltk.tokenize import sent_tokenize

# Load pre-trained model for question generation
question_model_name = "ramsrigouthamg/t5_squad_v1"
question_tokenizer = T5Tokenizer.from_pretrained(question_model_name)
question_model = T5ForConditionalGeneration.from_pretrained(question_model_name)

# Load pre-trained model for answering (Extractive QA)
answering_model = pipeline("question-answering", model="deepset/roberta-base-squad2")

def generate_questions(paragraph, num_questions=10):
    """Generates multiple diverse questions from the given paragraph."""
    sentences = sent_tokenize(paragraph)  # Break paragraph into sentences
    questions = set()  # Use a set to avoid duplicates

    for sentence in sentences:
        if len(questions) >= num_questions:
            break  # Stop if we have enough questions

        input_text = f"generate question: {sentence}"
        inputs = question_tokenizer(input_text, return_tensors="pt", max_length=512, truncation=True)

        outputs = question_model.generate(
            **inputs,
            max_length=64,
            do_sample=True,  # Enable sampling instead of greedy decoding
            top_k=50,  # Consider top 50 tokens for diversity
            top_p=0.95,  # Use nucleus sampling
            num_return_sequences=3,  # Generate multiple per sentence
            early_stopping=True
        )

        for output in outputs:
            question = question_tokenizer.decode(output, skip_special_tokens=True)
            questions.add(question)
            if len(questions) >= num_questions:
                break  # Stop if enough questions are generated

    return list(questions)[:num_questions]  # Ensure exactly `num_questions`

def generate_answers(paragraph, questions):
    """Generates answers for a list of questions using extractive QA."""
    answers = []
    for question in questions:
        try:
            answer = answering_model(question=question, context=paragraph)["answer"]
        except Exception:
            answer = "N/A"  # Handle cases where no answer is found
        answers.append(answer)
    return answers
