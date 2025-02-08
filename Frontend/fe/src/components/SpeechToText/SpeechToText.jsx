import React, { useState } from "react";
import axios from "axios";
import "./SpeechToText.css";
import { Upload, Clipboard } from "lucide-react";

const SpeechToText = () => {
  const [text, setText] = useState("");
  const [audioFile, setAudioFile] = useState(null);

  // Function to handle file upload
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setAudioFile(file);
      setText("Processing file...");

      const formData = new FormData();
      formData.append("audio", file);

      try {
        const response = await axios.post("http://localhost:5000/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        setText(response.data.transcription || "No transcription available.");
      } catch (error) {
        console.error("Error uploading file:", error);
        setText("Error processing audio file.");
      }
    }
  };

  // Function to copy text to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    alert("Text copied to clipboard!");
  };

  return (
    <div className="audio-container">
      <h1>🎙 Audio File to Text</h1>
      
      {/* File Upload */}
      <div className="upload-section">
        <input type="file" accept="audio/*" onChange={handleFileUpload} />
        {audioFile && <p>Uploaded: {audioFile.name}</p>}
      </div>

      {/* Transcription Display */}
      <div className="textarea">
        <textarea value={text} readOnly placeholder="Generated text will appear here..." />
      </div>

      {/* Copy Text Button */}
      <div className="buttons">
        <button className="copy" onClick={copyToClipboard} disabled={!text}>
          <Clipboard size={20} /> Copy Text
        </button>
      </div>
    </div>
  );
};

export default SpeechToText;
