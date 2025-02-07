import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './create.css';


function Create() {
    return (
        <div className="create-account-container">
          <div className="create-account-box">
            <h2>Create Account</h2>
            <form>
              <div className="input-box">
                <input type="text" required />
                <label>Username</label>
              </div>
              <div className="input-box">
                <input type="email" required />
                <label>Email</label>
              </div>
              <div className="input-box">
                <input type="password" required />
                <label>Password</label>
              </div>
              <button type="submit" className="create-account-btn">Create Account</button>
            </form>
            <div className="login-link">
              <p>Already have an account? <Link to="/">Login</Link></p>
            </div>
          </div>
        </div>
    );
}

export default Create;