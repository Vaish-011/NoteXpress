import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const Feedback = () => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!rating || !message) {
      alert("Please provide both a rating and a message.");
      return;
    }

    alert("Feedback submitted successfully!");
    setMessage(""); // Clear message after submission
    setRating(null);
  };

  return (
    <section>
      <div className="bg-black text-white py-20">
        <div className="container mx-auto flex flex-col md:flex-row my-6 md:my-24">
          <div className="flex flex-col w-full lg:w-1/3 p-8">
            <p className="ml-6 text-purple-500 text-lg uppercase tracking-loose">REVIEW</p>
            <p className="text-3xl md:text-5xl my-4 leading-relaxed md:leading-snug">
              Leave us a feedback!
            </p>
            <p className="text-sm md:text-base leading-snug text-gray-50 text-opacity-100">
              We’d love to hear from you! Share your thoughts and help us improve — your feedback means the world to us!
            </p>
          </div>
          <div className="flex flex-col w-full lg:w-2/3 justify-center">
            <div className="container w-full px-4">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white">
                    <div className="flex-auto p-5 lg:p-10">
                      <h4 className="text-2xl mb-4 text-black font-semibold">Rate our website</h4>
                      <form onSubmit={handleSubmit}>
                        <div className="relative w-full mb-3 flex justify-center space-x-2">
                          {[...Array(5)].map((_, index) => {
                            const currentRating = index + 1;
                            return (
                              <label key={index}>
                                <input
                                  type="radio"
                                  name="rating"
                                  value={currentRating}
                                  className="hidden"
                                  onClick={() => setRating(currentRating)}
                                />
                                <FaStar
                                  size={30}
                                  className="cursor-pointer"
                                  color={currentRating <= (hover || rating) ? "#fbbf24" : "#ccc"}
                                  onMouseEnter={() => setHover(currentRating)}
                                  onMouseLeave={() => setHover(null)}
                                />
                              </label>
                            );
                          })}
                        </div>
                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-gray-700 text-xs font-bold mb-2" htmlFor="message">
                            Message
                          </label>
                          <textarea
                            maxLength="300"
                            name="feedback"
                            rows="4"
                            className="border-0 px-3 py-3 bg-gray-300 placeholder-black text-gray-800 rounded text-sm shadow focus:outline-none w-full"
                            placeholder="Write your feedback here..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                          ></textarea>
                        </div>
                        <div className="text-center mt-6">
                          <button
                            className="bg-purple-600 text-black text-center mx-auto active:bg-yellow-400 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none"
                            type="submit"
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feedback;