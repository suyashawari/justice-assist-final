

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useNavigate } from 'react-router-dom'; // <-- IMPORT useNavigate
import './UserDashboard.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const StatusTracker = ({ currentStatus }) => {
    const statuses = ['submitted', 'analyzing', 'analyzed'];
    const currentIndex = statuses.indexOf(currentStatus.toLowerCase());

    return (
        <div className="report-status-tracker">
            {statuses.map((status, index) => (
                <div key={status} className={`status-step ${index <= currentIndex ? 'completed' : ''}`}>
                    <div className="status-dot"></div>
                    <div className="status-label" style={{textTransform: 'capitalize'}}>{status}</div>
                </div>
            ))}
        </div>
    );
};

const ReportCard = ({ report, onViewReport }) => ( // Renamed prop for clarity
    <div className="report-card">
        <div className="report-card-header">
            <h3>Report ID: JA-{report.report_id}</h3>
            <span className={`status-badge status-${report.status.toLowerCase()}`}>{report.status}</span>
        </div>
        <p className="report-description">
            <strong>Incident:</strong> {report.description.substring(0, 100)}...
        </p>
        <p className="report-date"><strong>Incident Date:</strong> {report.incident_date}</p>

        <StatusTracker currentStatus={report.status} />

        <div className="report-strength">
            <h4>Report Strength Checklist:</h4>
            <ul>
                <li className={report.description && report.description.length > 50 ? 'met' : 'not-met'}>
                    Detailed Description
                </li>
                <li className={report.evidence_file ? 'met' : 'not-met'}>
                    Evidence File Uploaded
                </li>
                 <li className={report.incident_date ? 'met' : 'not-met'}>
                    Incident Date Provided
                </li>
            </ul>
        </div>
        
        <div className="report-actions">
            {report.status.toLowerCase() === 'analyzed' && (
                <button className="analysis-btn" onClick={() => onViewReport(report.report_id)}>
                    View Full Report & Analysis
                </button>
            )}
        </div>
    </div>
);

const UserDashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [chartData, setChartData] = useState(null);
    const navigate = useNavigate(); // <-- INITIALIZE useNavigate

    const fetchDashboardData = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("Authentication failed. Please log in again.");
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/dashboard`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setDashboardData(response.data);

            if (response.data.category_counts && Object.keys(response.data.category_counts).length > 0) {
                const labels = Object.keys(response.data.category_counts);
                const data = Object.values(response.data.category_counts);
                setChartData({
                    labels,
                    datasets: [{
                        label: 'Reports',
                        data,
                        backgroundColor: ['#3F72AF', '#112D4E', '#DBE2EF', '#88a4c4', '#6b8eb9', '#4d75a8'],
                        borderColor: '#fff',
                        borderWidth: 2,
                    }],
                });
            }
        } catch (err) {
            console.error("Failed to fetch dashboard data:", err);
            setError("Could not load your dashboard. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };
    
    // UPDATED: This function now navigates to the new page
    const handleViewReport = (reportId) => {
        navigate(`/report/${reportId}`);
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    useEffect(() => {
        const hasPendingReports = () => {
            if (!dashboardData || !dashboardData.reports) return false;
            return dashboardData.reports.some(
                report => report.status === 'submitted' || report.status === 'analyzing'
            );
        };

        if (hasPendingReports()) {
            const intervalId = setInterval(() => {
                console.log("Polling for report updates...");
                fetchDashboardData();
            }, 10000);
            return () => clearInterval(intervalId);
        }
    }, [dashboardData]);

    if (isLoading) {
        return <div className="loading-container">Loading your dashboard...</div>;
    }

    if (error) {
        return <div className="error-container">{error}</div>;
    }

    const reports = dashboardData?.reports || [];
    const analyzedReportsCount = reports.filter(r => r.status.toLowerCase() === 'analyzed').length;
    const resolvedReportsCount = reports.filter(r => r.status.toLowerCase() === 'resolved').length;

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>My Dashboard</h1>
                <p>Welcome back! Here's an overview of your activity.</p>
            </header>

            <div className="dashboard-stats">
                <div className="stat-card">
                    <h2>{dashboardData.total_reports}</h2>
                    <p>Total Reports Submitted</p>
                </div>
                <div className="stat-card">
                    <h2>{analyzedReportsCount}</h2>
                    <p>Reports Analyzed</p>
                </div>
                <div className="stat-card">
                        <h2>{resolvedReportsCount}</h2>
                    <p>Cases Resolved</p>
                </div>
            </div>

            <div className="dashboard-main-content">
                <div className="recent-reports">
                    <h2>Recent Reports</h2>
                    {reports.length > 0 ? (
                        reports.map(report => (
                            <ReportCard 
                                key={report.report_id} 
                                report={report} 
                                onViewReport={handleViewReport}
                            />
                        ))
                    ) : (
                        <p className="no-reports-message">You have not submitted any reports yet.</p>
                    )}
                </div>

                <aside className="reports-overview">
                    <h2>Reports by Suspect Profile</h2>
                    {chartData ? (
                        <div className="chart-container">
                            <Doughnut data={chartData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' }} }} />
                        </div>
                    ) : (
                        <p>No category data to display. Submit a report to see statistics.</p>
                    )}
                </aside>
            </div>
        </div>
    );
};

export default UserDashboard;