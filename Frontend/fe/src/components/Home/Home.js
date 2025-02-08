import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; 
import Cookies from "js-cookie";  // Import js-cookie
import "./Home.css";
import { FaRegStickyNote, FaBrain, FaQuestionCircle, FaMicrophone, FaHeadphones, FaList } from "react-icons/fa";
import { AiOutlineFileText } from "react-icons/ai";

const photoCards = [
  { title: "Todo-List", description: "Organize your tasks and boost productivity.", icon: <FaList size={50} color="#fff" />,route: '/todo' },
  { title: "Note Making", description: "Create the notes from the text.", icon: <FaRegStickyNote size={50} color="#fff" /> , route:'/note-maker'},
  { title: "Notes", description: "Easily create and organize notes.", icon: <FaBrain size={50} color="#fff" />,route:'/note' },
  { title: "Question Generator from Notes", description: "AI creates questions from your notes.", icon: <FaQuestionCircle size={50} color="#fff" />,route:'/question' },
  { title: "Speech to Text", description: "Convert speech into editable text.", icon: <FaMicrophone size={50} color="#fff"/>, route: "/speech-to-text"  },
  { title: "Audio Notes & Voice Command", description: "Record notes and use voice commands.", icon: <FaHeadphones size={50} color="#fff" />,route:'/audio-notes' },
];

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("http://localhost:5000/auth-check", { withCredentials: true });
        setUser(response.data.user);  
      } catch (err) {
        console.error("Not authenticated", err);
        navigate("/login"); 
      }
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/logout", {}, { withCredentials: true });
      Cookies.remove("token");  // Remove token manually
      setUser(null);
      navigate("/"); 
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <h1 className="text-2xl font-bold text-white">Learn Buddy</h1>
        <div className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</div>
      </nav>

      <div className="main-content">
        <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
          <ul>
            <li><Link to="/feedback">Feedback</Link></li>
            <li><button onClick={handleLogout}>Log-out</button></li>
          </ul>
        </aside>

        <section className="cards-grid">
          {photoCards.map((card, index) => (
            <Link to={card.route} key={index} className="photo-card" style={{ textDecoration: 'none' }}>
              <article>
                <div className="icon-container">{card.icon}</div>
                <h3 className="card-title">{card.title}</h3>
                <p className="card-description">{card.description}</p>
              </article>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Home;
