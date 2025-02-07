import React, { useState } from "react";
import "./NoteMaker.css";

const NoteMaker = () => {
  const [inputText, setInputText] = useState("");
  const [generatedNote, setGeneratedNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerateNote = async () => {
    if (!inputText.trim()) {
      setError("Please enter some text.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await response.json();

      if (response.ok) {
        // Convert "-" into a new line with a star (★)
        const formattedNote = data.summary.replace(/-/g, "<br />★ ");
        setGeneratedNote("★ " + formattedNote); // Add star at the beginning
      } else {
        setError(data.error || "Failed to generate notes.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
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
          <button className="generate-btn" onClick={handleGenerateNote} disabled={loading}>
            {loading ? "Generating..." : "Generate Notes"}
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
        <div className="note-output">
          {/* Render with formatted stars and new lines */}
          <p dangerouslySetInnerHTML={{ __html: generatedNote || "Generated notes will appear here..." }}></p>
        </div>
      </div>
    </div>
  );
};

export default NoteMaker;
