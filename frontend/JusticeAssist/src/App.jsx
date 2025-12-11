


import React, { useEffect, useState, Suspense, lazy } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import { ThemeProvider } from './ThemeContext';
import Footer from './components/Footer';
import UserNavbar from './components/UserNavbar';
import AdminNavbar from './components/AdminNavbar';
import ScrollToTop from './components/ScrollToTop';
import ChatbotPopup from './components/ChatbotPopup';
import ProtectedRoute from './components/ProtectedRoute';

// --- LAZY LOAD PAGES ---
// This prevents downloading the Admin Dashboard or heavy pages until needed.
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ReportForm = lazy(() => import('./pages/ReportForm'));
const ReportDetail = lazy(() => import('./pages/ReportDetail'));
const GetGuidance = lazy(() => import('./pages/GetGuidance'));
const CyberAwareness = lazy(() => import('./pages/CyberAwareness'));
const SuspectGuess = lazy(() => import('./pages/SuspectGuess'));
const AIAssistant = lazy(() => import('./pages/AIAssistant'));
const Quiz = lazy(() => import('./pages/Quiz'));
const WhyUs = lazy(() => import('./pages/WhyUs'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const ForensicAnalysis = lazy(() => import('./pages/ForensicAnalysis'));
const UserDashboard = lazy(() => import('./pages/UserDashboard'));

// Admin Pages
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminUsers = lazy(() => import('./pages/admin/AdminUsers'));
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings'));

// Loading Spinner Component
const PageLoader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
    <div className="spinner" style={{
      width: '50px', height: '50px', border: '5px solid #f3f3f3',
      borderTop: '5px solid #3F72AF', borderRadius: '50%', animation: 'spin 1s linear infinite'
    }}></div>
    <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
  </div>
);

const App = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const role = localStorage.getItem('role');

  useEffect(() => {
    AOS.init({ duration: 1000, once: false, mirror: true });
    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
  }, [location]);

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/forgot-password';
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <ThemeProvider>
      <ScrollToTop />
      {!isAuthPage && (isAdminRoute && role === 'admin' ? <AdminNavbar /> : <UserNavbar />)}

      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/home" element={<Home />} />
          <Route path="/why-us" element={<WhyUs />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/awareness" element={<CyberAwareness />} />
          <Route path="/quiz" element={<Quiz />} />

          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to={role === 'admin' ? "/admin/dashboard" : "/user/dashboard"} replace />
              ) : (
                <Navigate to="/home" replace />
              )
            }
          />

          <Route path="/user/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
          <Route path="/report" element={<ProtectedRoute><ReportForm /></ProtectedRoute>} />
          <Route path="/report/:reportId" element={<ProtectedRoute><ReportDetail /></ProtectedRoute>} />
          <Route path="/get-guidance" element={<ProtectedRoute><GetGuidance /></ProtectedRoute>} />
          <Route path="/suspect-guess" element={<ProtectedRoute><SuspectGuess /></ProtectedRoute>} />
          <Route path="/chatbot" element={<ProtectedRoute><AIAssistant /></ProtectedRoute>} />
          <Route path="/forensic-analysis" element={<ProtectedRoute><ForensicAnalysis /></ProtectedRoute>} />

          <Route path="/admin/dashboard" element={<ProtectedRoute adminOnly={true}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute adminOnly={true}><AdminUsers /></ProtectedRoute>} />
          <Route path="/admin/settings" element={<ProtectedRoute adminOnly={true}><AdminSettings /></ProtectedRoute>} />
        </Routes>
      </Suspense>

      {!isAuthPage && <Footer />}
      {isLoggedIn && !isAuthPage && location.pathname !== '/chatbot' && <ChatbotPopup />}
    </ThemeProvider>
  );
};

export default App;