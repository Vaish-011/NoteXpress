import React, { useState, useRef } from "react";

const AudioRecorder = () => {
  const [recordings, setRecordings] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // Start Recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordings((prevRecordings) => [...prevRecordings, audioUrl]);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  // Stop Recording
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // Delete Recording
  const deleteRecording = (index) => {
    setRecordings((prevRecordings) => prevRecordings.filter((_, i) => i !== index));
  };

  return (
    <div className="container">
      <h1>Audio Notes</h1>
      <div className="buttons">
        <button onClick={startRecording} disabled={isRecording}>🎤 Start Recording</button>
        <button onClick={stopRecording} disabled={!isRecording}>⏹️ Stop Recording</button>
      </div>
      
      <div className="recordings">
        <h2>Recorded Audios</h2>
        {recordings.map((audioUrl, index) => (
          <div key={index} className="audio-item">
            <audio controls>
              <source src={audioUrl} type="audio/wav" />
              Your browser does not support the audio element.
            </audio>
            <button className="delete-btn" onClick={() => deleteRecording(index)}>🗑️</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AudioRecorder;
