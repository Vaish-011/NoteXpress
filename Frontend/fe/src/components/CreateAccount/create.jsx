import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './create.css';

function Create() {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/register', formData);
            alert(response.data.message);
        } catch (error) {
            alert(error.response?.data?.error || 'Error creating account');
        }
    };

    return (
        <div className="create-account-container">
            <div className="create-account-box">
                <h2>Create Account</h2>
                {message && <p className="message">{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="input-box">
                        <input type="text" name="username" value={formData.username} onChange={handleChange} required />
                        <label>Username</label>
                    </div>
                    <div className="input-box">
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                        <label>Email</label>
                    </div>
                    <div className="input-box">
                        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
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
