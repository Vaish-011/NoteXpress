from flask import Flask, request, jsonify
from flask_cors import CORS
from utils.notes import summarize_text  # Importing the function
from utils.summarizer import classify_subject,simplify_text

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

if __name__ == "__main__":
    app.run(debug=True)
