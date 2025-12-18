

import React, { useEffect, useState } from 'react';
import './AboutUs.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Lottie from 'lottie-react';

// REMOVED: import aboutAnimation from '../assets/aboutHeroAnimation.json'; 
// (The line above caused the error because the file was moved)

const AboutUs = () => {
  const [heroAnim, setHeroAnim] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    // Fetch the animation from the public folder instead of importing
    fetch('/animations/aboutHeroAnimation.json')
      .then(res => res.json())
      .then(setHeroAnim)
      .catch(err => console.error("Failed to load animation", err));
  }, []);

  return (
    <div className="about-us-page">
      {/* Hero Section */}
      <section className="about-hero" data-aos="fade-in">
        <div className="about-hero-content">
          <div className="about-hero-text">
            <h1>About JusticeAssist</h1>
            <p>Your trusted partner in the fight against cybercrime, providing AI-powered tools and expert guidance to empower every citizen.</p>
          </div>
          <div className="about-hero-animation">
            {/* Only render Lottie if the animation data is loaded */}
            {heroAnim ? (
              <Lottie animationData={heroAnim} loop={true} />
            ) : (
              // Placeholder to prevent layout shift
              <div style={{ height: '300px', width: '300px' }}></div> 
            )}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-mission" data-aos="fade-up">
        <h2>Our Mission</h2>
        <p>
          To empower every Indian citizen against cyber threats through accessible, AI-driven tools, comprehensive awareness programs, and simplified legal guidance. We are committed to making cybercrime reporting and resolution faster, smarter, and more transparent for everyone.
        </p>
      </section>

      {/* Story Section */}
      <section className="our-story" data-aos="fade-up">
        <h2>Our Story: The Journey to JusticeAssist</h2>
        <div className="story-timeline">
          <div className="story-point" data-aos="fade-right">
            <h3>The Spark</h3>
            <p>It began with a shared observation: while cybercrime rates were soaring, victims were often left feeling lost and powerless. The reporting process was complex, legal knowledge was inaccessible, and effective tools were scarce.</p>
          </div>
          <div className="story-point" data-aos="fade-left">
            <h3>The Vision</h3>
            <p>We envisioned a platform that could level the playing field—a digital ally for the common citizen. Our goal was to harness the power of AI to simplify complaint filing, provide clear guidance, and build a proactive, cyber-aware community.</p>
          </div>
          <div className="story-point" data-aos="fade-right">
            <h3>The Creation</h3>
            <p>JusticeAssist was born from this vision. A dedicated team of developers, designers, and cybersecurity enthusiasts collaborated to build an intelligent, user-centric platform, purpose-built to help people navigate the challenges of cybercrime with confidence.</p>
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="our-commitment" data-aos="fade-up">
        <h2>Our Commitment to You</h2>
        <div className="commitment-cards">
          <div className="commitment-card" data-aos="fade-right">
            <h3>Privacy & Security</h3>
            <p>Your data is yours. We are committed to the highest standards of data privacy and security, ensuring your information is protected at all times.</p>
          </div>
          <div className="commitment-card" data-aos="fade-left">
            <h3>Ethical AI</h3>
            <p>Our AI is built to assist, not to judge. We are dedicated to the ethical development and deployment of our technology to ensure fairness and accuracy.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta" data-aos="zoom-in">
        <h2>Join Us in Building a Safer Digital India</h2>
        <p>Whether you are a developer, a legal professional, or a passionate volunteer, your contribution can make a difference. Connect with us to get involved.</p>
        <button className="cta-button">Get in Touch</button>
      </section>
    </div>
  );
};

export default AboutUs;