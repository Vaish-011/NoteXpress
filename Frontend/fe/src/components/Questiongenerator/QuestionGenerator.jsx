import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./QuestionGenerator.css";

const QuestionGenerator = () => {
  const [textInput, setTextInput] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    // On button click, redirect to the next page (second page)
    history.push("/questions");
  };

  return (
    <div className="question-container">
      <div className="card">
        <h2 className="card-title">Text-to-Question Generator</h2>
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
