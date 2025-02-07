import React, { useState } from "react";
import ReactStars from "react-stars";
import "./Feedback.css";

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback Submitted:", { rating, message });
    alert("Thank you for your feedback!");
    setMessage("");
    setRating(0);
  };

  return (
    <div className="feedback-container">
      <h2 className="feedback-heading">Feedback</h2>
      <form onSubmit={handleSubmit} className="feedback-form">
        <label className="feedback-label">Your review is valuable to us ✨</label>
        <textarea 
           className="feedback-message"
           placeholder="Write your feedback..."
           value={message}
           onChange={(e) => setMessage(e.target.value)}
/>

    <div className="feedback-rating">
  <label className="feedback-label">Rate Us</label>
  <div className="feedback-stars-container">
    <ReactStars
      count={5}
      size={40}
      color2={"#ffd700"}
      value={rating}
      onChange={handleRatingChange}
    />
  </div>
</div>


        <button type="submit" className="feedback-button">Submit</button>
      </form>
    </div>
  );
};

export default Feedback;
