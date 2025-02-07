import React from "react";
import "./Summarizer.css";

const Summarizer = () => {
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
          <input type="file" id="file-upload" hidden />
          Choose File
        </label>
        <span className="file-info">No file chosen</span>
        <button className="upload-btn">Upload Doc</button>
      </div>

      <button className="summarize-btn">✨ Summarize</button>

      <footer>
        <p>
          <strong>0 sentences</strong> · <strong>0 words</strong>
        </p>
      </footer>
    </div>
  );
};

export default Summarizer;
