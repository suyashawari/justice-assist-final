

import React from 'react';
import './Footer.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-col brand">
        <h2>Justice<span>Assist</span></h2>
        <p>Your trusted guide in cybercrime awareness and resolution.</p>
      </div>

      <div className="footer-col">
        <h3>Quick Links</h3>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/#services">Services</a></li>
          <li><a href="/about">About Us</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </div>

      <div className="footer-col">
        <h3>Support</h3>
        <ul>
          <li><a href="/faq">FAQ</a></li>
          <li><a href="/legal-help">Legal Help</a></li>
          <li><a href="/report">Guide a Report</a></li>
        </ul>
      </div>

      <div className="footer-col social">
        <h3>Follow Us</h3>
        <div className="social-icons">
          <a href="/"><FaFacebookF /></a>
          <a href="/"><FaTwitter /></a>
          <a href="/"><FaInstagram /></a>
          <a href="/"><FaLinkedinIn /></a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 JusticeAssist. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;