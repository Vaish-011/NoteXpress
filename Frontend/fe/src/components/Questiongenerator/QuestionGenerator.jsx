import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./QuestionGenerator.css";

const QuestionGenerator = () => {
  const [textInput, setTextInput] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    // On button click, redirect to the next page (second page)
    navigate("/questions"); // Replace history.push with navigate
  };

  return (
    <div className="question-container">
      <div className="card">
        <h2 className="card-title">Question Generator</h2>
        <textarea
          className="text-input"
          placeholder="Enter your text or paragraph..."
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
        />
        <button className="generate-button" onClick={handleSubmit}>
          Generate Question
        </button>
      </div>
    </div>
  );
};

export default QuestionGenerator;
