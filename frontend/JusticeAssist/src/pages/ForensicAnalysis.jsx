// src/pages/ForensicAnalysis.jsx (New File)

import React, { useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FaFlask, FaDownload, FaSpinner } from 'react-icons/fa';
import './ForensicAnalysis.css'; // We will create this CSS file next

const ForensicAnalysis = () => {
    const [description, setDescription] = useState('');
    const [evidenceFile, setEvidenceFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [analysisResult, setAnalysisResult] = useState(null);

    const handleFileChange = (e) => {
        setEvidenceFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!description.trim() && !evidenceFile) {
            setError('Please provide a description or upload a file to analyze.');
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            setError("Authentication error. Please log in to use this tool.");
            return;
        }

        setIsLoading(true);
        setError('');
        setAnalysisResult(null);

        const formData = new FormData();
        formData.append('evidence_text', description);
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
            setError(err.response?.data?.error || "Failed to analyze evidence. The server might be busy or an error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGeneratePDF = () => {
        if (!analysisResult || !analysisResult.detailed) {
            alert("Cannot generate PDF, analysis data is missing.");
            return;
        }

        const { detailed } = analysisResult;
        const doc = new jsPDF();

        // Header
        doc.setFontSize(20);
        doc.setFont('helvetica', 'bold');
        doc.text("Forensic Analysis Report", 105, 20, { align: 'center' });
        doc.setFontSize(11);
        doc.setTextColor(100);
        doc.text(`Analysis Date: ${new Date().toLocaleString()}`, 105, 28, { align: 'center' });

        // Executive Summary
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text("1. Executive Summary", 14, 45);
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        doc.text(`Suspect Profile: ${detailed.suspect_profile || 'Unknown'}`, 14, 55);
        const summaryLines = doc.splitTextToSize(detailed.summary || 'No summary provided.', 180);
        doc.text(summaryLines, 14, 62);
        
        let lastY = doc.lastAutoTable.finalY || 70 + (summaryLines.length * 5);

        // Artifacts
        const artifacts = detailed.artifacts || {};
        const artifactBody = [];
        if (artifacts.emails?.length) artifactBody.push(['Emails', artifacts.emails.join('\n')]);
        if (artifacts.urls?.length) artifactBody.push(['URLs', artifacts.urls.join('\n')]);
        if (artifacts.ips?.length) artifactBody.push(['IP Addresses', artifacts.ips.join('\n')]);
        if (artifactBody.length === 0) artifactBody.push(['- No Artifacts Found -', '']);
        
        autoTable(doc, {
            startY: lastY + 5,
            head: [['2. Extracted Artifacts (Indicators of Compromise)', '']],
            body: artifactBody,
            theme: 'striped',
            headStyles: { fillColor: '#112D4E' },
            didDrawPage: (data) => { lastY = data.cursor.y; }
        });
        lastY = doc.lastAutoTable.finalY;

        // Tool Investigation Results
        const toolResults = detailed.tool_results?.file_metadata ? [detailed.tool_results.file_metadata] : [];
        if (toolResults.length > 0) {
            const toolBody = toolResults.map(result => {
                const metadata = result.metadata || {};
                const content = Object.entries(metadata).map(([key, value]) => `${key}: ${JSON.stringify(value)}`).join('\n');
                return [result.file_path || 'File', content];
            });
             autoTable(doc, {
                startY: lastY + 10,
                head: [['3. File Metadata Analysis', 'Details']],
                body: toolBody,
                theme: 'striped',
                headStyles: { fillColor: '#112D4E' },
             });
        }
        
        // Footer
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(9);
            doc.setTextColor(150);
            doc.text(`Page ${i} of ${pageCount} | Generated by JusticeAssist`, 105, 285, { align: 'center' });
        }

        doc.save("Forensic-Analysis-Report.pdf");
    };


    return (
        <div className="forensic-analysis-container">
            <div className="analysis-form-card">
                <h1 className="form-title">Forensic Analysis Tool</h1>
                <p className="form-subtitle">
                    Submit a description or file (like a screenshot or document) to run an automated forensic analysis.
                    The system will extract clues and generate a downloadable report.
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="description">Evidence Description</label>
                        <textarea
                            id="description"
                            rows="5"
                            placeholder="e.g., I received a suspicious email from 'user@example.com' with a link..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="evidenceFile">Evidence File (Optional)</label>
                        <input
                            type="file"
                            id="evidenceFile"
                            onChange={handleFileChange}
                            className="file-input"
                        />
                    </div>

                    <button type="submit" className="submit-btn" disabled={isLoading}>
                        {isLoading ? (
                            <><FaSpinner className="spinner" /> Analyzing...</>
                        ) : (
                            <><FaFlask /> Run Analysis</>
                        )}
                    </button>
                </form>

                {error && <p className="error-message">{error}</p>}
                
                {analysisResult && (
                    <div className="result-container">
                        <h2>Analysis Complete</h2>
                        <p>Your evidence has been processed. You can now download the detailed forensic report.</p>
                        <button onClick={handleGeneratePDF} className="download-btn">
                            <FaDownload /> Download PDF Report
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForensicAnalysis;