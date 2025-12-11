

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./GetGuidance.css";
import { useNavigate } from 'react-router-dom';

const guidanceData = [
  {
    title: "Financial Fraud",
    description: "Learn how to recognize and report online financial scams like UPI, banking, and card frauds.",
    details:
      "Financial frauds include online banking scams, UPI theft, ATM cloning, credit/debit card misuse, and more. Always verify payment links, do not share OTPs, and report suspicious activity immediately.",
    image: "/images/hacker03.jpg",
    video: "/videos/video01.mp4",
    link: "/report",
    category: "Online Financial Fraud",
  },
  {
    title: "Overpayment & Refund Scams",
    description: "Beware of scammers pretending to be relatives or friends and claiming mistaken payments.",
    details:
      "In this scam, fraudsters call victims pretending to be a relative or friend, claiming they accidentally sent a large amount (e.g., ₹20,000 instead of ₹2,000). They then emotionally manipulate the victim into refunding the extra money — often before the victim realizes no such money was received. These scams rely on urgency, emotional pressure, and impersonation.\n\nAlways verify the caller’s identity, never rush into refunding money, and double-check bank statements. When in doubt, ask for transaction proof or call the actual person being impersonated. Report immediately if you suspect fraud.",
    image: "/images/hacker01.jpg",
    video: "/videos/video02.mp4",
    link: "/report",
    category: "Online Financial Fraud",
  },
  // ... (Rest of your data remains the same)
  {
      title: "Social Media Hacking",
      description: "Protect your Facebook, Instagram, and WhatsApp accounts from unauthorized access.",
      details:
        "Enable 2FA on all social accounts, avoid public Wi-Fi, and never share login credentials. Use original apps only.",
      image: "/images/socialmedia.jpg",
      video: "/videos/video05.mp4",
      link: "/report",
      category: "Hacking/Unauthorized Access",
    },
];

export default function GetGuidance() {
  const [flippedIndex, setFlippedIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = flippedIndex !== null ? "hidden" : "auto";
  }, [flippedIndex]);

  const handleFlip = (index) => setFlippedIndex(index);
  const handleBack = () => setFlippedIndex(null);
  const handleReportClick = (category) => {
    setFlippedIndex(null);
    setTimeout(() => navigate(`/report?category=${encodeURIComponent(category)}`), 300);
  };

  return (
    <div className="guidance-container">
      <div className="cards-container">
        {guidanceData.map((item, index) => (
          <motion.div
            key={index}
            className="guidance-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            {/* Added loading="lazy" for image optimization */}
            <img 
              src={item.image} 
              alt={item.title} 
              className="guidance-img" 
              loading="lazy" 
              width="300" 
              height="220" 
            />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <div className="card-buttons">
              <button onClick={() => handleReportClick(item.category)} className="report-btn">
                Guidance Form
              </button>
              <button onClick={() => handleFlip(index)} className="know-btn">
                Know More
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* MODAL SECTION */}
      <AnimatePresence>
        {flippedIndex !== null && (
          <motion.div
            className="modal-overlay"
            onClick={handleBack}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="flipped-card"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0, rotateY: 90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotateY: 90 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <div className="modal-card-content">
                {/* 
                  VIDEO OPTIMIZATION:
                  The <video> tag only exists when flippedIndex !== null.
                  React will NOT create the DOM element until this moment.
                  Therefore, the browser will NOT download the video file
                  until the user clicks "Know More".
                */}
                <video 
                  controls 
                  className="modal-video" 
                  autoPlay 
                  preload="metadata" // Hint to browser
                >
                  <source src={guidanceData[flippedIndex].video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                <h2>{guidanceData[flippedIndex].title}</h2>
                <p style={{whiteSpace: "pre-line"}}>{guidanceData[flippedIndex].details}</p>
                <button className="back-btn" onClick={handleBack}>
                  ✕ Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}