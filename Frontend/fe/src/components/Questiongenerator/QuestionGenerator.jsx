import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './QuestionGenerator.css'

const GenerateQuestionPage = () => {
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGenerateQuestions = async () => {
    if (!inputText.trim()) {
      alert("Please enter some text to generate questions.");
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch("http://127.0.0.1:5000/question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await response.json();
      setLoading(false);

      if (data.qa_pairs) {
        navigate("/questionPage", { state: { qa_pairs: data.qa_pairs } });
      } else {
        alert("Failed to generate questions.");
      }
    } catch (error) {
      console.error("Error generating questions:", error);
      setLoading(false);
      alert("Error connecting to the server.");
    }
  };

  return (
    <div className="container">
      <h2>Enter Text to Generate Questions</h2>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Type or paste text here..."
        className="text-area"
      />
      <button onClick={handleGenerateQuestions} className="generate-button" disabled={loading}>
        {loading ? "Generating..." : "Generate Questions"}
      </button>
    </div>
  );
};

export default GenerateQuestionPage;
