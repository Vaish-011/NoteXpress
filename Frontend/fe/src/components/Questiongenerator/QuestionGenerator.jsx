import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./QuestionGenerator.css";

function QuestionGenerator() {
  const [inputText, setInputText] = useState("");
  const navigate = useNavigate();

  const handleGenerateQuestion = () => {
    if (inputText.trim() === "") {
      alert("Please enter text to generate questions!");
      return;
    }

    // Generate 10 random questions based on input text
    const questions = Array.from({ length: 10 }, (_, index) => `${inputText} Question ${index + 1}?`);
    
    // Navigate to the Question Page with generated questions
    navigate("/questions", { state: { questions } });
  };

  return (
    <div className="question-container">
      <h2 className="question-heading">Question Generator</h2>
      <form onSubmit={(e) => e.preventDefault()} className="question-form">
        <label className="question-label">Enter text to generate a question ✨</label>
        <textarea
          className="question-input"
          placeholder="Enter text..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />

        <div className="question-action">
          <button type="button" className="question-button" onClick={handleGenerateQuestion}>
            Generate Questions
          </button>
        </div>
      </form>
    </div>
  );
}

export default QuestionGenerator;