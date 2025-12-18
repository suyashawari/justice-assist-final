import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminSettings.css';
import { FaSave, FaKey, FaTools, FaListAlt } from 'react-icons/fa';

const AdminSettings = () => {
    const [settings, setSettings] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchSettings = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/settings`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setSettings(response.data);
            } catch (err) {
                setError("Failed to load settings.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const handleInputChange = (e, category) => {
        const { name, value } = e.target;
        setSettings(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [name]: value
            }
        }));
    };
    
    const handleToggleChange = (e) => {
        const { name, checked } = e.target;
        setSettings(prev => ({ ...prev, [name]: checked }));
    };

    const handleSave = async () => {
        const token = localStorage.getItem("token");
        setSuccess('');
        setError('');
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/admin/settings`, settings, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setSuccess("Settings saved successfully!");
            setTimeout(() => setSuccess(''), 3000); // Hide message after 3s
        } catch (err) {
            setError("Failed to save settings. Please try again.");
        }
    };

    if (isLoading) return <div className="loading-container">Loading Settings...</div>;
    if (error && !settings) return <div className="error-container">{error}</div>;

    // This check is necessary to prevent rendering with a null 'settings' object
    if (!settings) return null;

    return (
        <div className="admin-settings-container">
            <div className="settings-header">
                <h1>Application Settings</h1>
                <p>Manage core configurations for the JusticeAssist platform.</p>
            </div>
            
            {error && <p className="message error-message">{error}</p>}
            {success && <p className="message success-message">{success}</p>}

            <div className="settings-grid">
                {/* API Keys Card */}
                <div className="setting-card">
                    <h2 className="card-title"><FaKey /> API Configuration</h2>
                    <div className="form-group">
                        <label>OpenAI API Key</label>
                        <input type="password" name="openai" value={settings.api_keys.openai} onChange={(e) => handleInputChange(e, 'api_keys')} />
                    </div>
                    <div className="form-group">
                        <label>Google Gemini API Key</label>
                        <input type="password" name="google_gemini" value={settings.api_keys.google_gemini} onChange={(e) => handleInputChange(e, 'api_keys')} />
                    </div>
                     <div className="form-group">
                        <label>OpenRouter API Key</label>
                        <input type="password" name="openrouter" value={settings.api_keys.openrouter} onChange={(e) => handleInputChange(e, 'api_keys')} />
                    </div>
                </div>

                {/* General Settings Card */}
                <div className="setting-card">
                    <h2 className="card-title"><FaTools /> General Settings</h2>
                    <div className="toggle-group">
                        <label htmlFor="maintenance_mode">Maintenance Mode</label>
                        <div className="toggle-switch-container">
                            <input type="checkbox" id="maintenance_mode" name="maintenance_mode" className="toggle-switch-checkbox" checked={settings.maintenance_mode} onChange={handleToggleChange} />
                            <label htmlFor="maintenance_mode" className="toggle-switch-label"></label>
                        </div>
                        <span>{settings.maintenance_mode ? 'Enabled' : 'Disabled'}</span>
                    </div>
                    <p className="setting-description">
                        When enabled, users will not be able to log in or submit new reports.
                    </p>
                </div>

                {/* Report Categories Card */}
                 <div className="setting-card full-width">
                    <h2 className="card-title"><FaListAlt /> Report Categories</h2>
                    <div className="form-group">
                        <label>Manage complaint categories (one per line)</label>
                        <textarea
                            rows="6"
                            value={settings.report_categories.join('\n')}
                            onChange={(e) => setSettings(prev => ({...prev, report_categories: e.target.value.split('\n')}))}
                        />
                         <p className="setting-description">
                            These categories will appear in the user's report submission form.
                        </p>
                    </div>
                </div>
            </div>

            <div className="save-button-container">
                <button className="save-btn" onClick={handleSave}><FaSave /> Save All Settings</button>
            </div>
        </div>
    );
};

export default AdminSettings;