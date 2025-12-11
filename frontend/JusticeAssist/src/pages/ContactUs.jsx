// src/pages/ContactUs.jsx
import React, { useState } from 'react';
import './ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact-us-container">
      <div className="contact-us-header">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you. Please fill out the form below to get in touch.</p>
      </div>
      <div className="contact-us-content">
        <div className="contact-form-container">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-button">Send Message</button>
          </form>
        </div>
        <div className="contact-info-container">
          <h3>Our Contact Information</h3>
          <p><strong>Email:</strong> contact@justiceassist.in</p>
          <p><strong>Phone:</strong> +91 123 456 7890</p>
          <p><strong>Address:</strong> 123 Cyber Lane, Tech City, India</p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
