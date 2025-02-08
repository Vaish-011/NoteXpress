from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, decode_token
import datetime
from utils.notes import summarize_text  # Importing the function
from utils.summarizer import classify_subject,simplify_text
from utils.speechtotext import convert_audio_to_wav,transcribe_google
import os
from utils.questiongenerate import generate_answers,generate_questions
from database.connection import user_collection
from uuid import uuid4
from database.connection import feedback

# Initialize Flask app
app = Flask(__name__)
CORS(app, supports_credentials=True)
bcrypt = Bcrypt(app)

app.config["JWT_SECRET_KEY"] = "f1458f1d583c8831aa510b9b98c1423a57708a9efe6df70b781c3a69ec5052e1"  # Change this to a secure key
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = datetime.timedelta(days=1)

jwt = JWTManager(app)

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
    """API route to generate questions and answers from input text."""
    data = request.json
    text = data.get("text", "").strip()

    if not text:
        return jsonify({"error": "No text provided"}), 400

    try:
        questions = generate_questions(text, num_questions=10)
        answers = generate_answers(text, questions)

        # Ensure both lists have the same length
        if len(questions) != len(answers):
            return jsonify({"error": "Mismatch between questions and answers"}), 500

        qa_pairs = [{"question": q, "answer": a} for q, a in zip(questions, answers)]

        return jsonify({"qa_pairs": qa_pairs})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Register route
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    if not all(key in data for key in ["username", "email", "password"]):
        return jsonify({"error": "Missing fields"}), 400

    # Check if user already exists
    if user_collection.find_one({"email": data["email"]}):
        return jsonify({"error": "Email already registered"}), 409

    # Hash the password before storing
    hashed_password = bcrypt.generate_password_hash(data["password"]).decode('utf-8')

    user_collection.insert_one({
        "username": data["username"],
        "email": data["email"],
        "password": hashed_password
    })
    return jsonify({"message": "Account created successfully!"}), 201

# Login route
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    user = user_collection.find_one({"email": data["email"]})

    if user and bcrypt.check_password_hash(user["password"], data["password"]):
        access_token = create_access_token(identity=user["email"])

        response = jsonify({"message": "Login successful!"})
        response.set_cookie("token", access_token, httponly=True, samesite="None",secure=True)  # Set JWT in cookie
        return response, 200
    else:
        return jsonify({"error": "Invalid email or password"}), 401

# Logout route
@app.route('/logout', methods=['POST'])
def logout():
    response = jsonify({"message": "Logout successful!"})
    response.set_cookie("token", "", expires=0, httponly=True, samesite="None", secure=True)  # Expire the token
    return response, 200

@app.route('/auth-check', methods=['GET'])
def auth_check():
    token = request.cookies.get("token")
    if not token:
        return jsonify({"error": "Unauthorized"}), 401

    try:
        decoded_token = decode_token(token)
        return jsonify({"user": decoded_token["sub"]}), 200
    except Exception as e:
        return jsonify({"error": "Invalid token"}), 401
    

# New route for submitting feedback
@app.route('/feedback', methods=['POST'])
def submit_feedback():
    data = request.json
    user_id = data.get("user_id")
    feedback_text = data.get("feedback")
    stars = data.get("stars")
    # Optionally use a provided feedback_id, or generate a new one if not provided
    feedback_id = data.get("feedback_id", str(uuid4()))

    if not user_id or not feedback_text or stars is None:
        return jsonify({"error": "Missing required fields: user_id, feedback, and stars"}), 400

    try:
        stars = int(stars)
        if stars < 1 or stars > 5:
            return jsonify({"error": "Stars must be between 1 and 5"}), 400
    except ValueError:
        return jsonify({"error": "Stars must be an integer"}), 400

    feedback_data = {
        "user_id": user_id,
        "feedback_id": feedback_id,
        "feedback": feedback_text,
        "stars": stars,
        "timestamp": datetime.datetime.utcnow()
    }

    result = feedback.insert_one(feedback_data)

    if result.inserted_id:
        return jsonify({"message": "Feedback submitted successfully", "feedback_id": feedback_id}), 201
    else:
        return jsonify({"error": "An error occurred while submitting feedback"}), 500


if __name__ == "__main__":
    app.run(debug=True)
