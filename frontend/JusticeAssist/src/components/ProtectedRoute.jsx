

import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const role = localStorage.getItem('role');

  if (!isLoggedIn) {
    // If not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && role !== 'admin') {
    // If it's an admin-only route and user is not admin, redirect to user dashboard
    return <Navigate to="/user/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;