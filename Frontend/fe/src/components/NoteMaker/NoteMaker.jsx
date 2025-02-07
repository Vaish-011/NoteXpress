import React, { useState } from "react";
import "./NoteMaker.css";

const NoteMaker = () => {
  const [inputText, setInputText] = useState("");
  const [generatedNote, setGeneratedNote] = useState("");

  const handleGenerateNote = () => {
    // Generate notes logic (simple transformation for now)
    setGeneratedNote(inputText);
  };

  return (
    <div className="note-maker-container">
      <div className="note-card">
        <h2 className="note-title">My Notes</h2>
        <textarea
          className="note-input"
          placeholder="Type your text here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        ></textarea>
        <div className="note-actions">
          <button className="generate-btn" onClick={handleGenerateNote}>
            Generate Notes
          </button>
        </div>
        <div className="note-output">
          <p>{generatedNote || "Generated notes will appear here..."}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteMaker;
