from flask import Flask, request, jsonify
import torch
from transformers import pipeline, AutoModelForSequenceClassification, AutoTokenizer, T5ForConditionalGeneration, T5Tokenizer
import nltk
from sklearn.preprocessing import LabelEncoder

# Initialize Flask app
app = Flask(__name__)

# Download NLTK stopwords (if needed)
nltk.download('stopwords')

# === STEP 1: TEXT CLASSIFICATION MODEL ===

# Define subjects
SUBJECTS = ["history", "math", "science", "literature", "geography"]

# Load pre-trained classification model (replace with fine-tuned model if needed)
classifier_model = "distilbert-base-uncased"
classifier_tokenizer = AutoTokenizer.from_pretrained(classifier_model)
classifier = AutoModelForSequenceClassification.from_pretrained(classifier_model, num_labels=len(SUBJECTS))

# Convert labels to numerical form
label_encoder = LabelEncoder()
label_encoder.fit(SUBJECTS)

def classify_subject(text):
    """Classify input text into a subject."""
    inputs = classifier_tokenizer(text, return_tensors="pt", truncation=True, padding=True)
    with torch.no_grad():
        outputs = classifier(**inputs)
    predicted_label = torch.argmax(outputs.logits, dim=1).item()
    return SUBJECTS[predicted_label]

# === STEP 2: SUMMARIZATION MODEL ===

# Load pre-trained T5 summarization model
summarizer_model = "t5-small"
summarizer_tokenizer = T5Tokenizer.from_pretrained(summarizer_model)
summarizer = T5ForConditionalGeneration.from_pretrained(summarizer_model)

def summarize_text(text):
    """Summarize the input text."""
    inputs = summarizer_tokenizer("summarize: " + text, return_tensors="pt", max_length=512, truncation=True)
    summary_ids = summarizer.generate(inputs.input_ids, max_length=100, min_length=30, length_penalty=2.0, num_beams=4)
    return summarizer_tokenizer.decode(summary_ids[0], skip_special_tokens=True)

# === STEP 3: TEXT SIMPLIFICATION MODEL ===

# Load pre-trained T5 simplification model
simplifier_model = "t5-small"
simplifier_tokenizer = T5Tokenizer.from_pretrained(simplifier_model)
simplifier = T5ForConditionalGeneration.from_pretrained(simplifier_model)

def simplify_text(text):
    """Simplify the text using a simplification model."""
    inputs = simplifier_tokenizer("simplify: " + text, return_tensors="pt", max_length=512, truncation=True)
    simplified_ids = simplifier.generate(inputs.input_ids, max_length=100, num_beams=4, length_penalty=2.0)
    return simplifier_tokenizer.decode(simplified_ids[0], skip_special_tokens=True)
