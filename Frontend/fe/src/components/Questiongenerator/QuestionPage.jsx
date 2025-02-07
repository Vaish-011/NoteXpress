import React, { useState, useEffect } from "react";
import "./QuestionPage.css";

const QuestionForm = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    // Fetch questions from backend (mocked for now)
    const fetchQuestions = async () => {
      const fetchedQuestions = [
        "What is your name?",
        "What is your age?",
        "What is your favorite color?",
        "Where do you live?",
        "What is your favorite hobby?",
        "What is your dream job?",
        "Who is your role model?",
        "What is your favorite movie?",
        "What is your favorite food?",
        "What is your favorite place to visit?"
      ];
      setQuestions(fetchedQuestions);
    };
    fetchQuestions();
  }, []);

  const handleChange = (index, value) => {
    setAnswers({ ...answers, [index]: value });
  };

  return (
    <div className="container">
      <h2 className="title">Answer the Questions</h2>
      <form>
        {questions.map((question, index) => (
          <div key={index} className="question-box">
            <label className="question-text">{index + 1}. {question}</label>
            <input
              type="text"
              className="answer-box"
              value={answers[index] || ""}
              onChange={(e) => handleChange(index, e.target.value)}
              placeholder="Type your answer here..."
            />
          </div>
        ))}
      </form>
    </div>
  );
};

export default QuestionForm;