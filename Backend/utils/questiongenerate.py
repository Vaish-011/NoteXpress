from transformers import T5ForConditionalGeneration, T5Tokenizer, pipeline

# Load pre-trained model for question generation
question_model_name = "ramsrigouthamg/t5_squad_v1"
question_tokenizer = T5Tokenizer.from_pretrained(question_model_name)
question_model = T5ForConditionalGeneration.from_pretrained(question_model_name)

# Load pre-trained model for answering (Extractive QA)
answering_model = pipeline("question-answering", model="deepset/roberta-base-squad2")

def generate_questions(paragraph, num_questions=3):
    """Generates multiple questions from the given paragraph."""
    input_text = "generate question: " + paragraph
    inputs = question_tokenizer(input_text, return_tensors="pt", max_length=512, truncation=True)
    
    # Generate multiple outputs
    outputs = question_model.generate(
        **inputs, 
        max_length=64, 
        num_beams=5, 
        num_return_sequences=num_questions,  # Generate multiple questions
        early_stopping=True
    )
    
    questions = [question_tokenizer.decode(output, skip_special_tokens=True) for output in outputs]
    return questions

def generate_answers(paragraph, questions):
    """Generates answers for a list of questions using extractive QA."""
    answers = [answering_model(question=question, context=paragraph)["answer"] for question in questions]
    return answers

# Example input paragraph
paragraph = """Web development is the work involved in developing a website for the Internet or an intranet.
Web development can range from developing a simple single static page to complex web applications.
There are three kinds of Web developer specialization: front-end, back-end, and full-stack development."""

# Generate Multiple Questions
questions = generate_questions(paragraph, num_questions=3)

# Generate Answers for each question
answers = generate_answers(paragraph, questions)

# Print Output
for i, (q, a) in enumerate(zip(questions, answers)):
    print(f"Q{i+1}: {q}")
    print(f"A{i+1}: {a}\n")
