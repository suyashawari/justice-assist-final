

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './Login.css';
import axios from 'axios';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, {
        username: email,
        password: password,
      });

      alert('Account created successfully! Please proceed to login.');
      navigate('/login');

    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError('A user with this email already exists.');
      } else {
        setError('Registration failed. Please try again later.');
      }
      console.error('Signup error:', err);
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-form-container-single" style={{ maxWidth: '500px' }}>
        <button onClick={() => navigate('/login')} className="back-btn">
          <FaArrowLeft />
        </button>
        <h2 style={{ marginBottom: '2rem' }}>Create an Account</h2>

        <form onSubmit={handleSignup} className="login-form-element">
          <div className="input-group">
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="login-btn" style={{ marginTop: '1rem' }}>Sign Up</button>
        </form>

        <div className="signup-link" style={{ marginTop: '2rem' }}>
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;