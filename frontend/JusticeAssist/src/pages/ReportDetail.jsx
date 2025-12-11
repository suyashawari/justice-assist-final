



import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import './ReportDetail.css';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// --- 1. NEW, MORE RESILIENT PARSING FUNCTION ---
// This function is designed to handle messy, AI-generated Markdown-like tables and text.
const parseAiSummary = (markdownString) => {
    if (!markdownString || typeof markdownString !== 'string') {
        return { table: null, otherText: '' };
    }

    const lines = markdownString.trim().split('\n');
    const tableData = [];
    let otherTextParts = [];
    let isTable = false;

    for (const line of lines) {
        if (line.includes('|')) {
            isTable = true;
            // Skip separator lines
            if (line.includes('---')) continue;

            const row = line
                .split('|')
                .map(cell => cell.replace(/<br>/g, '\n').replace(/\*\*|`/g, '').trim())
                .slice(1, -1); // Remove empty cells from start/end pipes

            if (row.length > 0) {
                tableData.push(row);
            }
        } else {
            otherTextParts.push(line);
        }
    }

    let table = null;
    if (isTable && tableData.length > 1) {
        table = {
            head: [tableData[0]], // jspdf-autotable expects head to be an array of arrays
            body: tableData.slice(1),
        };
    } else {
        // If no valid table was found, treat everything as other text
        otherTextParts = markdownString.split('\n');
    }

    return {
        table,
        otherText: otherTextParts.join('\n')
    };
};


const ReportDetail = () => {
    const { reportId } = useParams();
    const [report, setReport] = useState(null);
    const [analysis, setAnalysis] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchReportData = async () => {
            setIsLoading(true);
            const token = localStorage.getItem("token");
            if (!token) {
                setError("Authentication error. Please log in.");
                setIsLoading(false);
                return;
            }

            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/report/${reportId}/details`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setReport(response.data.data.submission_details);
                setAnalysis(response.data.data.analysis_details);

            } catch (err) {
                console.error("Failed to fetch report details:", err);
                setError("Could not load report details. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchReportData();
    }, [reportId]);

    const handleGeneratePDF = () => {
        if (!report || !analysis) {
            alert("Cannot generate PDF, data is missing.");
            return;
        }
        const doc = new jsPDF();

        doc.setFontSize(20);
        doc.setFont('helvetica', 'bold');
        doc.text("Cybercrime Forensic Report", 105, 20, { align: 'center' });
        doc.setFontSize(12);
        doc.text(`Report ID: JA-${report.id}`, 105, 28, { align: 'center' });

        autoTable(doc, {
            startY: 40,
            head: [['Complainant Details', 'Information']],
            body: [
                ['Name', `${report.first_name || ''} ${report.last_name || ''}`],
                ['Email', report.email || 'N/A'],
                ['Phone', report.phone || 'N/A'],
                ['Address', `${report.city || ''}, ${report.state || ''}`],
            ],
            theme: 'striped',
            headStyles: { fillColor: '#112D4E' },
        });

        autoTable(doc, {
            startY: doc.lastAutoTable.finalY + 10,
            head: [['Incident Details', 'Information']],
            body: [
                ['Incident Date', report.incident_date || 'N/A'],
                ['Platform', report.platform || 'N/A'],
                ['Category', report.complaint_category || 'N/A'],
                ['Description', report.description || 'N/A'],
            ],
            theme: 'striped',
            headStyles: { fillColor: '#112D4E' },
            bodyStyles: { cellWidth: 'wrap' },
            columnStyles: { 1: { cellWidth: 130 } }
        });

        if (analysis && analysis.executive_summary) {
            doc.addPage();
            doc.setFontSize(16);
            doc.setFont('helvetica', 'bold');
            doc.text("AI Forensic Analysis", 14, 20);

            let lastY = 30;
            const { table, otherText } = parseAiSummary(analysis.executive_summary.summary);

            if (table) {
                autoTable(doc, {
                    startY: lastY,
                    head: table.head,
                    body: table.body,
                    theme: 'grid',
                    headStyles: { fillColor: '#3F72AF' },
                    didDrawPage: (data) => { lastY = data.cursor.y; }
                });
                 lastY = doc.lastAutoTable.finalY;
            }

            if (otherText) {
                doc.setFontSize(10);
                doc.setFont('helvetica', 'normal');
                const splitText = doc.splitTextToSize(otherText, 180);
                doc.text(splitText, 14, lastY + 10);
                lastY = doc.getTextDimensions(splitText).h + lastY + 10;
            }

            autoTable(doc, {
                startY: lastY + 10,
                head: [['Indicators of Compromise (IOCs)', '']],
                body: [
                    ['Emails', analysis.indicators_of_compromise?.emails?.join(',\n') || 'None'],
                    ['URLs', analysis.indicators_of_compromise?.urls?.join(',\n') || 'None'],
                    ['IP Addresses', analysis.indicators_of_compromise?.ips?.join(',\n') || 'None'],
                ],
                theme: 'grid',
                headStyles: { fillColor: '#3F72AF' },
            });
        }

        doc.save(`JusticeAssist_Report_JA-${report.id}.pdf`);
    };

    if (isLoading) return <div className="loading-container">Loading Report...</div>;
    if (error) return <div className="error-container">{error}</div>;
    if (!report) return <div className="error-container">Could not load report submission data.</div>;

    return (
        <div className="report-detail-container">
            <div className="report-detail-header">
                <h1>Report JA-{report.id}</h1>
                <button className="download-pdf-btn" onClick={handleGeneratePDF} disabled={!analysis}>
                    Download PDF Report
                </button>
            </div>

            <div id="report-content">
                <section className="report-section">
                    <h2>User Submitted Details</h2>
                    <div className="details-grid">
                        <div className="detail-item"><strong>Name:</strong> {report.first_name} {report.last_name}</div>
                        <div className="detail-item"><strong>Email:</strong> {report.email}</div>
                        <div className="detail-item"><strong>Phone:</strong> {report.phone}</div>
                        <div className="detail-item"><strong>Location:</strong> {report.city}, {report.state}</div>
                        <div className="detail-item"><strong>Incident Date:</strong> {report.incident_date}</div>
                        <div className="detail-item"><strong>Category:</strong> {report.complaint_category}</div>
                    </div>
                    <h3 style={{ marginTop: '1.5rem' }}>Description:</h3>
                    <div className="description-box">{report.description}</div>
                </section>

                {analysis ? (
                    <>
                        <section className="report-section">
                            <h2>AI Forensic Analysis</h2>
                            <div className="detail-item">
                                <strong>Incident Type:</strong> {analysis.executive_summary?.incident_type}
                            </div>
                            <div className="detail-item" style={{ marginTop: '1rem' }}>
                                <strong>Suspected Profile:</strong> {analysis.executive_summary?.suspect_profile}
                            </div>
                            <h3 style={{ marginTop: '1.5rem' }}>Summary:</h3>
                            
                            <div className="description-box">
                                <div className="markdown-content">
                                    <ReactMarkdown
                                        children={analysis.executive_summary?.summary}
                                        remarkPlugins={[remarkGfm]}
                                    />
                                </div>
                            </div>
                        </section>

                        <section className="report-section">
                            <h2>Indicators of Compromise (IOCs)</h2>
                            <div className="details-grid">
                                <div className="detail-item"><strong>Emails:</strong> {analysis.indicators_of_compromise?.emails?.join(', ') || 'None Found'}</div>
                                <div className="detail-item"><strong>URLs:</strong> {analysis.indicators_of_compromise?.urls?.join(', ') || 'None Found'}</div>
                                <div className="detail-item"><strong>IP Addresses:</strong> {analysis.indicators_of_compromise?.ips?.join(', ') || 'None Found'}</div>
                            </div>
                        </section>
                    </>
                ) : (
                    <section className="report-section">
                        <h2>AI Forensic Analysis</h2>
                        <div className="description-box">Analysis is pending or has not completed successfully.</div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default ReportDetail;