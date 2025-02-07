import React, { useState } from "react";
import "./SpeechToText.css";
import { Upload, Clipboard } from "lucide-react";

const SpeechToText = () => {
  const [text, setText] = useState("");
  const [audioFile, setAudioFile] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAudioFile(file);
      processAudio(file);
    }
  };

  const processAudio = (file) => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const arrayBuffer = event.target.result;
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.lang = "en-US";

      recognition.onresult = (event) => {
        setText(event.results[0][0].transcript);
      };

      recognition.onerror = (event) => console.error("Error:", event.error);

      recognition.start();
    };

    reader.readAsArrayBuffer(file);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    alert("Text copied to clipboard!");
  };

  return (
    <div className="container">
      <h1>🎙 Audio File to Text</h1>
      <div className="upload-section">
        <input type="file" accept="audio/*" onChange={handleFileUpload} />
        {audioFile && <p>Uploaded: {audioFile.name}</p>}
      </div>
      <div className="textarea">
        <textarea value={text} readOnly placeholder="Generated text will appear here..." />
      </div>
      <div className="buttons">
        <button className="copy" onClick={copyToClipboard} disabled={!text}>
          <Clipboard size={20} /> Copy Text
        </button>
      </div>
    </div>
  );
};

export default SpeechToText;
