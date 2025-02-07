import React from "react";
import "./QuestionGenerator.css";

const QuestionsPage = () => {
  return (
    <div className="question-container">
      <div className="card">
        <h2 className="card-title">Generated Questions</h2>
        
        {/* Question 1 */}
        <div className="question-item">
          <p className="question-text">Question 1: What is the capital of France?</p>
          <input type="text" className="answer-input" placeholder="Your answer..." />
        </div>

        {/* Question 2 */}
        <div className="question-item">
          <p className="question-text">Question 2: Who invented the telephone?</p>
          <input type="text" className="answer-input" placeholder="Your answer..." />
        </div>

        {/* Add more questions dynamically if needed */}
      </div>
    </div>
  );
};

export default QuestionsPage;
