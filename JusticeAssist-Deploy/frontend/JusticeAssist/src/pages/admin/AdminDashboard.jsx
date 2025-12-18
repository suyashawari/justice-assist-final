

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './AdminDashboard.css';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const TimeFilter = ({ activePeriod, onPeriodChange }) => {
    const periods = [
        { key: '7d', label: 'Last 7 days' },
        { key: '30d', label: 'Last 30 days' },
        { key: 'this_month', label: 'This Month' },
    ];

    return (
        <div className="time-filter-container">
            {periods.map(period => (
                <button
                    key={period.key}
                    className={`time-filter-btn ${activePeriod === period.key ? 'active' : ''}`}
                    onClick={() => onPeriodChange(period.key)}
                >
                    {period.label}
                </button>
            ))}
        </div>
    );
};


const AdminDashboard = () => {
    const [stats, setStats] = useState({ totalReports: 0, pending: 0, totalUsers: 0 });
    const [reports, setReports] = useState([]);
    const [lineChartData, setLineChartData] = useState(null);
    const [timePeriod, setTimePeriod] = useState('7d');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchDashboardData = async () => {
            setIsLoading(true);
            setError('');
            const token = localStorage.getItem("token");
            if (!token) {
                setError("Authentication failed.");
                setIsLoading(false);
                return;
            }

            try {
                const [reportsResponse, usersResponse, analyticsResponse] = await Promise.all([
                    axios.get(`${process.env.REACT_APP_API_URL}/api/admin/all-reports`, { headers: { Authorization: `Bearer ${token}` } }),
                    axios.get(`${process.env.REACT_APP_API_URL}/api/admin/users`, { headers: { Authorization: `Bearer ${token}` } }),
                    axios.get(`${process.env.REACT_APP_API_URL}/api/admin/report-analytics?period=${timePeriod}`, { headers: { Authorization: `Bearer ${token}` } })
                ]);

                const allReports = reportsResponse.data.reports || [];
                const allUsers = usersResponse.data || [];

                setStats({
                    totalReports: allReports.length,
                    pending: allReports.filter(r => r.status === 'submitted' || r.status === 'analyzing').length,
                    totalUsers: allUsers.length
                });

                setReports(allReports.slice(0, 5));
                setLineChartData(analyticsResponse.data);

            } catch (err) {
                const errorMessage = err.response?.data?.message || err.message || "An unknown error occurred.";
                setError(`Could not load dashboard data: ${errorMessage}`);
                console.error("Dashboard loading failed:", err.response || err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, [timePeriod]);

    // Function to handle navigation
    const handleViewReport = (reportId) => {
        navigate(`/report/${reportId}`);
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                align: 'center',
                labels: {
                    boxWidth: 12,
                    padding: 20,
                    font: {
                        size: 14
                    }
                }
            },
        },
        scales: {
            x: { grid: { display: false } },
            y: { grid: { color: '#e0e0e0', borderDash: [5, 5] }, beginAtZero: true }
        },
        elements: { point: { radius: 0 } }
    };

    if (isLoading && !lineChartData) return <div className="loading-container">Loading Dashboard...</div>;
    if (error) return <div className="error-container">{error}</div>;

    return (
        <div className="admin-dashboard-container">
            <div className="admin-dashboard-grid">
                <div className="dashboard-title-area">
                    <h1>Admin Overview</h1>
                    <p>Monitor system activity and manage reports.</p>
                </div>

                <div className="dashboard-card recent-reports-card">
                    <h2>Recent Reports</h2>
                    {reports.length > 0 ? (
                        reports.map(report => (
                            // Add onClick handler to this div
                            <div className="report-item" key={report.id} onClick={() => handleViewReport(report.id)}>
                                <div className="report-item-header">
                                    <span>JA-{report.id}</span>
                                    <span className={`status-badge status-${report.status.toLowerCase()}`}>
                                        {report.status}
                                    </span>
                                </div>
                                <p style={{ color: '#555', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                                    {report.complaint_category || "General Inquiry"}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p>No recent reports found.</p>
                    )}
                </div>

                <div className="stats-container">
                    <div className="dashboard-card stat-item">
                        <h3>{stats.totalReports}</h3>
                        <p>Total Reports</p>
                    </div>
                    <div className="dashboard-card stat-item">
                        <h3>{stats.pending}</h3>
                        <p>Pending Analysis</p>
                    </div>
                    <div className="dashboard-card stat-item">
                        <h3>{stats.totalUsers}</h3>
                        <p>Total Users</p>
                    </div>
                </div>

                <div className="dashboard-card reports-timeline-card">
                    <div className="timeline-header">
                        <h2>Top User Reports</h2>
                        <TimeFilter activePeriod={timePeriod} onPeriodChange={setTimePeriod} />
                    </div>
                    <div className="chart-wrapper">
                       {lineChartData && lineChartData.datasets.length > 0 ? (
                            <Line data={lineChartData} options={chartOptions} />
                        ) : (
                            <div className="no-chart-data">No reporting activity found for this period.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;