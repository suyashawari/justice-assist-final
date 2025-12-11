// src/pages/WhyUs.jsx
import React from 'react';
import './WhyUs.css';
import { FaShieldAlt, FaUserFriends, FaRocket, FaBrain, FaLanguage, FaBalanceScale } from 'react-icons/fa';

const WhyUs = () => {
  return (
    <div className="whyus-container">
      <h1
        className="whyus-heading"
        data-aos="fade-down"
        data-aos-duration="800"
        >
        Why Choose JusticeAssist?
        </h1>
        <p
        className="whyus-subheading"
        data-aos="fade-up"
        data-aos-delay="200"
        data-aos-duration="800"
        >
        JusticeAssist empowers citizens to report and fight cybercrime with smart technology and human support.
        </p>


      <div className="whyus-cards">
        <div className="whyus-card" data-aos="fade-up">
          <FaShieldAlt className="whyus-icon" />
          <h2 className="whyus-title">Trusted Cybercrime Help</h2>
          <p>Our platform is tailored for secure, verified complaint submission based on national standards.</p>
        </div>

        <div className="whyus-card" data-aos="fade-up" data-aos-delay="100">
          <FaBrain className="whyus-icon" />
          <h2 className="whyus-title">AI-Powered Guidance</h2>
          <p>Our intelligent assistant helps you understand your cybercrime situation and suggests the right actions instantly.</p>
        </div>

        <div className="whyus-card" data-aos="fade-up" data-aos-delay="200">
          <FaBalanceScale className="whyus-icon" />
          <h2 className="whyus-title">Legal & Advocate Support</h2>
          <p>Get connected with legal experts or advocates for support in severe or complex cybercrime cases.</p>
        </div>

        <div className="whyus-card" data-aos="fade-up" data-aos-delay="300">
          <FaLanguage className="whyus-icon" />
          <h2 className="whyus-title">Multilingual & Inclusive</h2>
          <p>Available in English, Hindi, and Marathi – JusticeAssist ensures accessibility for everyone.</p>
        </div>

        <div className="whyus-card" data-aos="fade-up" data-aos-delay="400">
          <FaUserFriends className="whyus-icon" />
          <h2 className="whyus-title">User-Friendly Interface</h2>
          <p>Simple design, floating labels, animations, and mobile responsiveness enhance your experience.</p>
        </div>

        <div className="whyus-card" data-aos="fade-up" data-aos-delay="500">
          <FaRocket className="whyus-icon" />
          <h2 className="whyus-title">Fast & Efficient Tools</h2>
          <p>From PDF generation to complaint tracking and suspect guessing — we’ve got tools that save time and effort.</p>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
