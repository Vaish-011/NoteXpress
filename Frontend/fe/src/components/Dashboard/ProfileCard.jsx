import React, { useState } from "react";
import "../Dashboard/ProfileCard.css";
import { FaEdit, FaCheck } from "react-icons/fa";

const EditableField = ({ label, value, type = "text" }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleSave = () => {
    setIsEditing(false);
    // You can add an API call here to save the updated value
  };

  return (
    <div className="editable-field">
      <label>{label}</label>
      <div className="field-container">
        {isEditing ? (
          <input
            type={type}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        ) : (
          <span>{inputValue}</span>
        )}
        <button onClick={() => (isEditing ? handleSave() : setIsEditing(true))}>
          {isEditing ? <FaCheck /> : <FaEdit />}
        </button>
      </div>
    </div>
  );
};

const ProfileCard = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="avatar">
          <img src="your-photo-url.jpg" alt="Profile Photo" />
          <button className="edit-avatar-btn">
            <FaEdit />
          </button>
        </div>
        <h2>Edit Profile</h2>
        <EditableField label="Name" value={name} />
        <EditableField label="Email" value={email} type="email" />
      </div>
    </div>
  );
};

export default ProfileCard;
