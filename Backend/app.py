from flask import Flask, request, jsonify
from flask_cors import CORS
from utils.notes import summarize_text  # Importing the function
from utils.summarizer import classify_subject,simplify_text
from utils.speechtotext import convert_audio_to_wav,transcribe_google
import os
from utils.questiongenerate import generate_answers,generate_questions

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Route for summarizing text
@app.route('/notes', methods=['POST'])
def summarize():
    data = request.json
    text = data.get("text", "")

    if not text:
        return jsonify({"error": "No text provided"}), 400

    summary = summarize_text(text)
    return jsonify({"summary": summary})


@app.route('/process_text', methods=['POST'])
def process_text():
    """API endpoint that classifies, summarizes, and simplifies text."""
    try:
        data = request.json
        input_text = data.get("text", "")

        if not input_text:
            return jsonify({"error": "No text provided"}), 400

        # Step 1: Classify Subject
        subject = classify_subject(input_text)

        # Step 2: Summarize the Text
        summary = summarize_text(input_text)

        # Step 3: Simplify the Summary
        simplified_summary = simplify_text(summary)

        response = {
            "subject": subject,
            "summary": summary,
            "simplified_summary": simplified_summary
        }
        return jsonify(response)

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@app.route('/upload', methods=['POST'])
def upload_audio():
    if 'audio' not in request.files:
        return jsonify({"error": "No file part"}), 400

    audio_file = request.files['audio']

    if audio_file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # Save and process the file
    filepath = os.path.join("uploads", audio_file.filename)
    audio_file.save(filepath)

    # Convert and transcribe
    wav_file = convert_audio_to_wav(filepath)
    transcription = transcribe_google(wav_file)

    return jsonify({"transcription": transcription})

# Route for summarizing text
@app.route('/question', methods=['POST'])
def question():
    data = request.json
    text = data.get("text", "")

    if not text:
        return jsonify({"error": "No text provided"}), 400

    questions = generate_questions(text,num_questions=3)
    answers = generate_answers(text,questions)
    if len(questions) != len(answers):
        return jsonify({"error": "Mismatch between questions and answers"}), 500

    # Combining questions and answers into a structured JSON format
    qa_pairs = [{"question": q, "answer": a} for q, a in zip(questions, answers)]

    return jsonify({"summary": qa_pairs})

if __name__ == "__main__":
    app.run(debug=True)
