import React, { useState, useEffect } from "react";
import ReactStars from "react-stars";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Feedback.css";

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [feedbackList, setFeedbackList] = useState([]);

  const navigate = useNavigate();

  // Check for user authentication on component mount and fetch feedback entries
  useEffect(() => {
    const checkAuthAndFetchFeedback = async () => {
      try {
        // Check if the user is authenticated
        const authResponse = await axios.get("http://localhost:5000/auth-check", { withCredentials: true });
        setUser(authResponse.data.user);

        // Fetch all feedback entries from the backend
        const feedbackResponse = await axios.get("http://localhost:5000/feedback");
        setFeedbackList(feedbackResponse.data);
      } catch (err) {
        console.error("Error during authentication or fetching feedback", err);
        navigate("/login"); // Redirect to login if not authenticated or on error
      }
    };

    checkAuthAndFetchFeedback();
  }, [navigate]);

  // Update rating state when the user changes the rating
  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  // Submit feedback and update the list upon success
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Feedback Submitted:", { rating, message });

    // Build the payload to send to the backend.
    const payload = {
      user_id: user || 1, // Using the authenticated user; fallback to 1 if necessary
      feedback: message,
      stars: rating
    };

    try {
      const response = await fetch("http://localhost:5000/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        alert("Error: " + (data.error || "An error occurred."));
      } else {
        alert("Thank you for your feedback! Feedback ID: " + data.feedback_id);
        // Refresh the feedback list after successful submission
        const feedbackResponse = await axios.get("http://localhost:5000/feedback");
        setFeedbackList(feedbackResponse.data);
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("An error occurred while submitting your feedback.");
    }

    // Reset the form fields after submission
    setMessage("");
    setRating(0);
  };

  return (
    <div className="feedback-container">
      <div className="feedback-input-container">
        <h2 className="feedback-heading">Feedback</h2>
        <form onSubmit={handleSubmit} className="feedback-form">
          <label className="feedback-label">Your review is valuable to us ✨</label>
          <textarea 
            className="feedback-message"
            placeholder="Write your feedback..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>

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

      {/* Separate div for displaying feedback received so far */}
      <div className="feedback-received-container">
        <h3>Feedback Received</h3>
        {feedbackList.length === 0 ? (
          <p>No feedback yet.</p>
        ) : (
          feedbackList.map((fb) => (
            <div key={fb.feedback_id} className="feedback-item">
              <p><strong>User:</strong> {fb.user_id}</p>
              <p><strong>Feedback:</strong> {fb.feedback}</p>
              <p><strong>Rating:</strong> {fb.stars}</p>
              {fb.timestamp && (
                <p>
                  <strong>Submitted:</strong> {new Date(fb.timestamp).toLocaleString()}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Feedback;
