import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Ensure axios is imported
import "./Home.css";
import { FaRegStickyNote, FaBrain, FaQuestionCircle, FaMicrophone, FaHeadphones, FaCamera } from "react-icons/fa";
import { AiOutlineFileText } from "react-icons/ai";

const photoCards = [
  { title: "Summarizer", description: "Get key points from long texts instantly.", icon: <AiOutlineFileText size={50} color="#fff" /> },
  { title: "Note Making", description: "Easily create and organize notes.", icon: <FaRegStickyNote size={50} color="#fff" /> },
  { title: "Mind-Map", description: "Visualize ideas with interactive mind maps.", icon: <FaBrain size={50} color="#fff" /> },
  { title: "Question Generator from Notes", description: "AI creates questions from your notes.", icon: <FaQuestionCircle size={50} color="#fff" /> },
  { title: "Speech to Text", description: "Convert speech into editable text.", icon: <FaMicrophone size={50} color="#fff" /> },
  { title: "Audio Notes & Voice Command", description: "Record notes and use voice commands.", icon: <FaHeadphones size={50} color="#fff" /> },
  { title: "OCR", description: "Convert handwriting into digital text.", icon: <FaCamera size={50} color="#fff" /> },
];

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <h1 className="text-2xl font-bold text-white">Learn Buddy</h1>
        <div className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</div>
      </nav>

      <div className="main-content">
        {/* Sidebar */}
        <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
          <ul>
            <li>Profile</li>
            <li><Link to="/feedback">Feedback</Link></li>
            <li><button>Log-out</button></li>
          </ul>
        </aside>

        {/* Photo Cards Section */}
        <section className="cards-grid">
          {photoCards.map((card, index) => (
            <article key={index} className="photo-card">
              <div className="icon-container">{card.icon}</div>
              <h3 className="card-title">{card.title}</h3>
              <p className="card-description">{card.description}</p>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Home;
