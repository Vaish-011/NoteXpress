import React, { useState, useRef } from "react";
import "../Dashboard/ProfileCard.css"; // Use same styling file for consistency
import { FaEdit, FaCheck } from "react-icons/fa";

const EditableField = ({ label, value, type = "text", onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const inputRef = useRef(null);

  const handleSave = () => {
    setIsEditing(false);
    if (onSave) {
      onSave(inputValue); // Call parent save function
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setInputValue(value); // Reset on cancel
    }
  };

  return (
    <div className="editable-field">
      <label>{label}</label>
      <div className="field-container">
        {isEditing ? (
          <input
            ref={inputRef}
            type={type}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <span>{inputValue}</span>
        )}
        <button
          onClick={() => {
            if (isEditing) {
              handleSave();
            } else {
              setIsEditing(true);
              setTimeout(() => inputRef.current?.focus(), 0); // Ensure input gets focus
            }
          }}
          aria-label={isEditing ? "Save changes" : "Edit field"}
        >
          {isEditing ? <FaCheck /> : <FaEdit />}
        </button>
      </div>
    </div>
  );
};

export default EditableField;
