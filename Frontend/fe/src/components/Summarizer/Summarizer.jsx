import React, { useState } from "react";
import "./Summarizer.css";

const Summarizer = () => {
  const [generatedText, setGeneratedText] = useState("");
  const [fileName, setFileName] = useState("No file chosen");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        setGeneratedText(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  const handleSummarize = () => {
    // Placeholder for the summarize logic
    const summary = "This is a summarized version of the uploaded or pasted content.";
    setGeneratedText(summary);
  };

  return (
    <div className="container">
      <header>
        <h1>📄 AI Summarizer Tool</h1>
        <p>Quickly summarize your documents or text with ease.</p>
      </header>

      <div className="modes">
        <button className="mode-btn">Paragraph</button>
        <button className="mode-btn">Bullet Points</button>
        <button className="mode-btn">Custom</button>
      </div>

      <div className="slider-container">
        <label htmlFor="summary-length">Summary Length:</label>
        <input type="range" id="summary-length" name="summary-length" min="1" max="100" />
        <div className="slider-labels">
          <span>Short</span>
          <span>Long</span>
        </div>
      </div>

      <textarea placeholder="Paste your text here..."></textarea>

      <div className="upload-section">
        <label htmlFor="file-upload" className="file-upload-label">
          <input type="file" id="file-upload" hidden onChange={handleFileUpload} />
          Choose File
        </label>
        <span className="file-info">{fileName}</span>
      </div>

      <button className="summarize-btn" onClick={handleSummarize}>✨ Summarize</button>

      {generatedText && (
        <div className="generated-text">
          <h2>Generated Text:</h2>
          <textarea readOnly value={generatedText}></textarea>
        </div>
      )}

      <footer>
        <p>
          <strong>0 sentences</strong> · <strong>0 words</strong>
        </p>
      </footer>
    </div>
  );
};

export default Summarizer;
