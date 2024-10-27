import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from './ThemeProvider'; // Adjust the path according to your project structure

const ThemeToggle = () => {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <button onClick={toggleTheme} style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} style={{ marginRight: '8px' }} />
            Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
        </button>
    );
};

export default ThemeToggle;
