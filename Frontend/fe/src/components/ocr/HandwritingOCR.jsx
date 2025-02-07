import React, { useState } from "react";
import Tesseract from "tesseract.js";
import { FaUpload, FaFileImage } from "react-icons/fa";

const HandwritingOCR = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setText("");
    }
  };

  const extractText = () => {
    if (!image) return;
    setLoading(true);

    Tesseract.recognize(image, "eng")
      .then(({ data: { text } }) => {
        setText(text);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error extracting text:", error);
        setLoading(false);
      });
  };

  return (
    <div className="ocr-container">
      <h2>Upload Handwritten Image</h2>
      <label className="upload-box">
        <FaUpload className="upload-icon" />
        <p>Click to Upload or Drag & Drop</p>
        <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
      </label>

      {image && (
        <div className="image-preview">
          <img src={image} alt="Uploaded preview" />
        </div>
      )}

      <button onClick={extractText} disabled={!image || loading} className="extract-btn">
        {loading ? "Extracting..." : "Extract Text"}
      </button>

      {loading && <div className="loading-spinner"></div>}

      {text && (
        <div className="extracted-text">
          <h3>Extracted Text:</h3>
          <p>{text}</p>
        </div>
      )}
    </div>
  );
};

export default HandwritingOCR;
