import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CrimeDetail.css';

const crimeDetails = [
  {
    title: "Online Financial Fraud",
    details: "Covers UPI, banking, card frauds. Learn how to detect & report.",
    tips: [
      "Never share OTP or PIN.",
      "Use official banking apps only.",
      "Report on 1930 immediately."
    ],
    video: "https://www.youtube.com/embed/RCBX1IuBvW0"
  },
  {
    title: "Cyberbullying & Harassment",
    details: "Involves abusive messages, online threats, or defamation.",
    tips: [
      "Block the abuser immediately.",
      "Take screenshots as evidence.",
      "Report on cybercrime portal."
    ],
    video: "https://www.youtube.com/embed/fake-url"
  },
  // More crime types...
];

const CrimeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const crime = crimeDetails[id];

  if (!crime) return <h2>Crime type not found</h2>;

  return (
    <div className="crime-detail">
      <button onClick={() => navigate(-1)} className="back-btn">← Back</button>
      <h1>{crime.title}</h1>
      <p>{crime.details}</p>

      <h3>Prevention Tips</h3>
      <ul>
        {crime.tips.map((tip, index) => <li key={index}>{tip}</li>)}
      </ul>

      <div className="video-section">
        <h3>Watch Video</h3>
        <iframe
          src={crime.video}
          title={crime.title}
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default CrimeDetail;
