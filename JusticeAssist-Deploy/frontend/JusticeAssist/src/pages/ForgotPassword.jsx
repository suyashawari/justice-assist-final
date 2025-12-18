// src/pages/ForgotPassword.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css'; // Reusing login styles

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send a request to your backend
    // to send a password reset email to the provided email address.
    setMessage('If an account with that email exists, a password reset link has been sent.');
    setEmail('');
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-form-container-single" style={{ maxWidth: '450px' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>Forgot Password?</h2>
        <p style={{ marginBottom: '1.5rem', color: 'rgba(255, 255, 255, 0.8)' }}>
          Enter your email address below and we'll send you a link to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="login-form-element">
          <div className="input-group">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
            />
          </div>

          {message && <p className="error-message" style={{ color: '#dbe2ef' }}>{message}</p>}

          <button type="submit" className="login-btn" style={{ marginTop: '1rem' }}>Send Reset Link</button>
        </form>

        <div className="signup-link" style={{ marginTop: '2rem' }}>
          <p><Link to="/login">Back to Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
