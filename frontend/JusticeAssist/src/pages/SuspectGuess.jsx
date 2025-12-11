


import React, { useState } from "react";
import { FaChevronDown, FaSearch } from "react-icons/fa";
import "./SuspectGuess.css";
import axios from 'axios';

const AnalysisResultDisplay = ({ result }) => {
    if (!result) return null;

    return (
        <div className="analysis-result-details">
            <h4>Analysis Summary</h4>
            <p><strong>Suspected Profile:</strong> {result.dashboard?.suspect_profile || 'N/A'}</p>
            <p><strong>Summary:</strong> {result.dashboard?.summary || 'No summary provided.'}</p>

            <h4>Extracted Artifacts</h4>
            <ul>
                {result.dashboard?.artifacts?.emails?.length > 0 && <li><strong>Emails:</strong> {result.dashboard.artifacts.emails.join(', ')}</li>}
                {result.dashboard?.artifacts?.urls?.length > 0 && <li><strong>URLs:</strong> {result.dashboard.artifacts.urls.join(', ')}</li>}
                {result.dashboard?.artifacts?.ip_addresses?.length > 0 && <li><strong>IPs:</strong> {result.dashboard.artifacts.ip_addresses.join(', ')}</li>}
            </ul>
        </div>
    );
};

const SuspectGuess = () => {
    const [openAccordion, setOpenAccordion] = useState(null);
    const [evidenceText, setEvidenceText] = useState("");
    const [evidenceFile, setEvidenceFile] = useState(null);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const toggleAccordion = (index) => {
        setOpenAccordion(openAccordion === index ? null : index);
    };

    const handleAnalyze = async () => {
        if (!evidenceText.trim() && !evidenceFile) {
            setError("Please provide either text or a file to analyze.");
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            setError("Authentication error. Please log in.");
            return;
        }

        setIsLoading(true);
        setError("");
        setAnalysisResult(null);

        const formData = new FormData();
        formData.append('evidence_text', evidenceText);
        if (evidenceFile) {
            formData.append('evidence_file', evidenceFile);
        }

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/ai/guess-suspect`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setAnalysisResult(response.data);
        } catch (err) {
            console.error("Analysis error:", err);
            setError("Failed to analyze evidence. The server might be busy.");
        } finally {
            setIsLoading(false);
        }
    };

    const investigationSteps = [
        // This array can be populated if you wish to add the accordion guide section
    ];

    return (
        <div className="suspect-guess-page">
            <section className="suspect-hero">
                <h1>Identify Suspect Details</h1>
                <p>Understand the digital footprints left behind and how they can lead to suspect identification in cybercrime cases.</p>
            </section>

            <section className="investigation-guide">
                <h2>How Digital Evidence Helps</h2>
                <div className="accordion-container">
                    {investigationSteps.map((step, index) => (
                        <div className="accordion-item" key={index}>
                            <button className="accordion-header" onClick={() => toggleAccordion(index)}>
                                <span className="accordion-icon">{step.icon}</span>
                                <span className="accordion-title">{step.title}</span>
                                <FaChevronDown className={`accordion-arrow ${openAccordion === index ? 'open' : ''}`} />
                            </button>
                            {openAccordion === index && (
                                <div className="accordion-content">
                                    <p><strong>What it is:</strong> {step.content.what}</p>
                                    <p><strong>How it helps:</strong> {step.content.how}</p>
                                    <p><strong>Common Tools/Methods:</strong> {step.content.tools}</p>
                                    <p><strong>What you can do:</strong> {step.content.todo}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            <section className="analysis-section">
                <h2>Forensic Analysis Tool</h2>
                <p>Paste any suspicious text (like a scam email or message) and/or upload an evidence file (like a screenshot) to get an AI-powered forensic analysis.</p>
                <div className="analysis-input-group">
                    <textarea
                        placeholder="Paste suspicious text evidence here..."
                        value={evidenceText}
                        onChange={(e) => setEvidenceText(e.target.value)}
                        rows="6"
                    ></textarea>
                    <input
                        type="file"
                        onChange={(e) => setEvidenceFile(e.target.files[0])}
                    />
                    <button onClick={handleAnalyze} disabled={isLoading}>
                        {isLoading ? 'Analyzing...' : <><FaSearch /> Analyze Evidence</>}
                    </button>
                </div>
                {error && <p className="error-message" style={{textAlign: 'center', color: 'red'}}>{error}</p>}
                {analysisResult && <AnalysisResultDisplay result={analysisResult} />}
            </section>

            <section className="disclaimer-section">
                <h2>Important Disclaimer</h2>
                <p>The information provided on this page is for educational and informational purposes only. It is not intended as legal advice or a substitute for professional investigation. Actual cybercrime investigations require specialized tools, legal authority, and expertise, and should always be conducted by trained law enforcement professionals. JusticeAssist provides guidance to help you understand the process and prepare information for official channels.</p>
            </section>
        </div>
    );
};

export default SuspectGuess;