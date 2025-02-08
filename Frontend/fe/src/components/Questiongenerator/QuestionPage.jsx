import React from "react";
import { useLocation } from "react-router-dom";
import "./QuestionPage.css";

const QuestionPage = () => {
  const location = useLocation();
  const qaPairs = location.state?.qa_pairs || []; // Get question-answer pairs

  return (
    <div className="container">
      <h2 className="title">Generated Questions & Answers</h2>
      {qaPairs.length === 0 ? (
        <p>No questions available. Generate some first!</p>
      ) : (
        <div>
          {qaPairs.map((qa, index) => (
            <div key={index} className="question-box">
              <label className="question-text">
                {index + 1}. {qa.question.replace("question:", "").trim()}
              </label>
              <input
                type="text"
                className="answer-box"
                value={qa.answer || ""}
                readOnly // Display answer, but make it non-editable
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuestionPage;
