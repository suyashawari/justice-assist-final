// src/pages/AdminUsers.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminUsers.css';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    
    // State for the new admin form
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [formError, setFormError] = useState('');

    const fetchUsers = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/users`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers(response.data);
        } catch (err) {
            setError("Could not fetch users.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleAddAdmin = async (e) => {
        e.preventDefault();
        setFormError('');
        const token = localStorage.getItem("token");
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/admin/users`, 
                { username, password },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setUsername('');
            setPassword('');
            fetchUsers(); // Refresh the list
        } catch (err) {
            setFormError(err.response?.data?.error || "Failed to create admin.");
        }
    };

    const handleDeleteUser = async (userId) => {
        if (window.confirm('Are you sure you want to remove this user? This action cannot be undone.')) {
            const token = localStorage.getItem("token");
            try {
                await axios.delete(`${process.env.REACT_APP_API_URL}/api/admin/users/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                fetchUsers(); // Refresh the list
            } catch (err) {
                alert(err.response?.data?.error || "Failed to delete user.");
            }
        }
    };

    if (isLoading) return <div>Loading users...</div>;
    if (error) return <div style={{color: 'red'}}>{error}</div>;

    return (
        <div className="admin-users-container">
            <div className="admin-users-header">
                <h1>Manage Users</h1>
            </div>
            <div className="admin-users-content">
                <div className="add-admin-form">
                    <h2>Add New Admin</h2>
                    <form onSubmit={handleAddAdmin}>
                        <div className="form-group">
                            <label htmlFor="username">Email (Username)</label>
                            <input 
                                type="email" 
                                id="username" 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password" 
                                id="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                            />
                        </div>
                        {formError && <p style={{color: 'red'}}>{formError}</p>}
                        <button type="submit" className="add-admin-btn">Create Admin</button>
                    </form>
                </div>
                <div className="users-list-container">
                    <table className="users-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Username</th>
                                <th>Role</th>
                                <th>Date Joined</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>
                                        <span className={`role-badge role-${user.role}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td>{user.created_at}</td>
                                    <td>
                                        <button className="remove-btn" onClick={() => handleDeleteUser(user.id)}>
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminUsers;