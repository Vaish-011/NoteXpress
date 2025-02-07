import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css"; 

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/login", { email, password }, { withCredentials: true });
      alert("Login successful!",res.data);
      navigate("/home"); // Redirect after login
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <label>Email</label>
          </div>
          <div className="input-box">
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            <label>Password</label>
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
