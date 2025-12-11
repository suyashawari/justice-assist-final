
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './UserNavbar.css';

const UserNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [magicLineStyle, setMagicLineStyle] = useState({});
  const location = useLocation();
  const dropdownRef = useRef();
  const navigate = useNavigate();

  const homeRef = useRef();
  const servicesRef = useRef();
  const whyUsRef = useRef();
  const aboutUsRef = useRef();
  const contactRef = useRef();
  const linksRef = useRef();

  const servicePaths = [
    '/get-guidance',
    '/report',
    '/chatbot',
    '/awareness',
    '/suspect-guess',
  ];

  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    let activeRef;
  
    if (location.pathname === '/home') activeRef = homeRef; // 👈 Changed from '/' to '/home'
    else if (servicePaths.includes(location.pathname)) activeRef = servicesRef;
    else if (location.pathname === '/why-us') activeRef = whyUsRef;
    else if (location.pathname === '/about-us') activeRef = aboutUsRef;
    else if (location.pathname === '/contact') activeRef = contactRef;
  
    if (activeRef && activeRef.current && linksRef.current) {
      const activeRect = activeRef.current.getBoundingClientRect();
      const parentRect = linksRef.current.getBoundingClientRect();
  
      setMagicLineStyle({
        left: activeRect.left - parentRect.left,
        width: activeRect.width,
      });
    } else {
      setMagicLineStyle({ left: 0, width: 0 });
    }
  }, [location.pathname]);
  
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
    window.location.reload();
  };

  const getLinkClass = (path) => {
    if (path === 'services') {
      return servicePaths.includes(location.pathname)
        ? 'nav-link active'
        : 'nav-link';
    }
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/home" className="navbar-logo" onClick={() => setIsOpen(false)}>
          Justice<span>Assist</span>
        </Link>
      </div>

      <div className={`navbar-center ${isOpen ? 'open' : ''}`}>
        <div className="navbar-links" ref={linksRef}>
          <Link ref={homeRef} to="/home" className={getLinkClass('/home')}>
            Home
          </Link>

          <div className={`dropdown ${dropdownOpen ? 'open' : ''}`} ref={dropdownRef}>
            <span
              ref={servicesRef}
              className={getLinkClass('services')}
              role="button"
              tabIndex={0}
              onClick={() => setDropdownOpen(prev => !prev)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setDropdownOpen(prev => !prev);
              }}
            >
              Services ▾
            </span>
            <div className="dropdown-content">
              <Link to="/get-guidance">Get Guidance</Link>
              <Link to="/report">PDF Generator</Link>
              <Link to="/chatbot">AI Assistant</Link>
              <Link to="/awareness">Cyber Awareness</Link>
              <Link to="/suspect-guess">Suspect Guess</Link>
            </div>
          </div>

          <Link ref={whyUsRef} to="/why-us" className={getLinkClass('/why-us')}>
            Why Us
          </Link>
          <Link ref={aboutUsRef} to="/about-us" className={getLinkClass('/about-us')}>
            About Us
          </Link>
          <Link ref={contactRef} to="/contact" className={getLinkClass('/contact')}>
            Contact
          </Link>
          <div className="magic-line" style={magicLineStyle}></div>
        </div>
      </div>

      <div className="navbar-right">
        {/* 👇 THIS IS THE NEW LINK TO THE DASHBOARD */}
        <Link to="/user/dashboard" className="nav-link">
            Dashboard
        </Link>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
        <div className="hamburger" onClick={toggleMenu}>
          <span className={`bar ${isOpen ? 'rotate1' : ''}`}></span>
          <span className={`bar ${isOpen ? 'fade' : ''}`}></span>
          <span className={`bar ${isOpen ? 'rotate2' : ''}`}></span>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;