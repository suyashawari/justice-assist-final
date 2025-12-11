

import React, { useEffect, useState } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Lottie from 'lottie-react';

const Home = () => {
  // State to hold animation data
  const [chatbotAnim, setChatbotAnim] = useState(null);
  const [suspectAnim, setSuspectAnim] = useState(null);
  const [awarenessAnim, setAwarenessAnim] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: false, mirror: true });

    // Fetch animations asynchronously from the public folder
    // This prevents them from bloating the main JavaScript bundle
    const loadAnimations = async () => {
        try {
            const [chatData, suspectData, awareData] = await Promise.all([
                fetch('/animations/chatbot.json').then(res => res.json()),
                fetch('/animations/detective.json').then(res => res.json()),
                fetch('/animations/cybersecurity.json').then(res => res.json())
            ]);
            setChatbotAnim(chatData);
            setSuspectAnim(suspectData);
            setAwarenessAnim(awareData);
        } catch (error) {
            console.error("Failed to load animations:", error);
        }
    };

    loadAnimations();
  }, []);

  return (
    <div className="home-container">
      <section className="hero">
        <h1 data-aos="fade-down">
          Welcome to <span>JusticeAssist</span>
        </h1>
        <p className="fade-in">
          JusticeAssist – Your Trusted Companion in Navigating and Resolving Cybercrime.
        </p>
        <Link to="/Get-Guidance" className="cta-button" data-aos="zoom-in">
          Start Guidance
        </Link>
      </section>

      <section id="features" className="features">
        {/* Chatbot Feature */}
        <div className="feature-card chatbot-feature" data-aos="fade-up">
          <div className="chatbot-content">
            <div className="chatbot-left">
              {chatbotAnim ? (
                <Lottie animationData={chatbotAnim} loop={true} style={{ width: '100%', maxWidth: '380px' }} />
              ) : <div style={{height: '300px'}}></div>}
            </div>
            <div className="chatbot-right">
              <h2 className="chatbot-heading">AI Chatbot Assistant </h2>
              <p className="chatbot-description">
                Get instant help from our intelligent assistant trained on real cybercrime data and legal frameworks.
                <br /><br />
                ➤  Draft cybercrime complaints instantly (PDF-ready)<br />
                ➤  Explain what evidence you need (screenshots, details, etc.)<br />
                ➤  Understand your rights under Indian cyber laws<br />
              </p>
              <Link to="/chatbot">
                <button className="cta-button">Try the Chatbot</button>
              </Link>
            </div>
          </div>
        </div>

        {/* Suspect Feature */}
        <div className="feature-card suspect-feature" data-aos="fade-up">
          <div className="suspect-guess">
            <div className="feature-lottie">
              {suspectAnim ? (
                <Lottie animationData={suspectAnim} loop={true} style={{ width: '100%', maxWidth: '380px' }} />
              ) : <div style={{height: '300px'}}></div>}
            </div>
            <div className="feature-text">
              <h2>Suspect Guess </h2>
              <p>
                Not sure who might be behind a suspicious message or attack? Our Suspect Guess tool helps analyze digital clues.
                <br /><br />
                ➤ Interpret email headers, IP logs, and device metadata <br />
                ➤ Link usernames, domains, or online aliases <br />
              </p>
              <Link to="/suspect-guess">
                <button className="cta-button">Analyze Clues</button>
              </Link>
            </div>
          </div>
        </div>

        {/* Awareness Feature */}
        <div className="feature-card awareness-feature" data-aos="fade-up">
          <div className="awareness-content">
            <div className="awareness-left">
              {awarenessAnim ? (
                <Lottie animationData={awarenessAnim} loop={true} style={{ width: '100%', maxWidth: '380px' }} />
              ) : <div style={{height: '300px'}}></div>}
            </div>
            <div className="awareness-right">
              <h2>Awareness Tools </h2>
              <p>
                Stay ahead of cybercriminals with our interactive Awareness Tools designed to educate and empower every internet user.
                <br /><br />
                ➤   Educational videos on real-life cybercrime cases<br />
                ➤   Quizzes like "Are You Cyber Safe?"<br />
              </p>
              <div className="awareness-buttons">
                <Link to="/awareness">
                  <button className="cta-button">Explore Tools</button>
                </Link>
                <Link to="/quiz">
                  <button className="cta-button cta-secondary">Take a Quiz</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;