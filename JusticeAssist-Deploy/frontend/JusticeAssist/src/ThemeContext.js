import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the context with a default value
const ThemeContext = createContext();

// Create a provider component
export const ThemeProvider = ({ children }) => {
    // Initialize state from localStorage or default to 'light'
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

    useEffect(() => {
        const body = window.document.body;
        // Remove the old theme class and add the new one
        body.classList.remove('light', 'dark');
        body.classList.add(theme);
        // Save the theme to localStorage
        localStorage.setItem('theme', theme);
    }, [theme]); // Re-run this effect whenever the theme changes

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Custom hook to use the theme context easily
export const useTheme = () => useContext(ThemeContext);