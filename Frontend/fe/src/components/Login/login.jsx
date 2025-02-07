import React from "react";
import { Link } from "react-router-dom";
import "./login.css"; 

function Login() {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form>
          <div className="input-box">
            <input type="email" required />
            <label>Email</label>
          </div>
          <div className="input-box">
            <input type="password" required />
            <label>Password</label>
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
        <div className="signup-link">
          <p>New to Learn Buddy? <Link to="/create-account">Create Account</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;