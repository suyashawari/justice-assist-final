import React, { useState } from 'react';
import "./CyberAwareness.css";


const CrimePredictor = () => {
  const [userComplaint, setUserComplaint] = useState('');
  const [prediction, setPrediction] = useState('');

  const handlePrediction = async () => {
    try {
      const response = await fetch('http://localhost:5001/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ complaint: userComplaint }),
      });

      const data = await response.json();
      setPrediction(data.predicted_category);
    } catch (error) {
      console.error('Error predicting crime:', error);
      setPrediction('Error: Could not connect to prediction server');
    }
  };

  return (
    <div className="crime-predictor-container" style={{ padding: '2rem' }}>
      <h2>Cybercrime Type Predictor 🔍</h2>
      <textarea
        placeholder="Describe your cyber complaint..."
        value={userComplaint}
        onChange={(e) => setUserComplaint(e.target.value)}
        rows={6}
        style={{ width: '100%', marginBottom: '1rem' }}
      />
      <button onClick={handlePrediction}>Predict Crime Type</button>

      {prediction && (
        <div style={{ marginTop: '1rem', fontWeight: 'bold' }}>
          Predicted Category: {prediction}
        </div>
      )}
    </div>
  );
};

export default CrimePredictor;
