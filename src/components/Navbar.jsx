// src/components/Navbar.js
import React from 'react';
import { useTheme } from './ThemeProvider'; // Import useTheme hook
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavbarContainer = styled.nav`
    display: flex; /* Use flexbox for layout */
    justify-content: space-between; /* Space between elements */
    align-items: center; /* Center vertically */
    padding: 20px;
    background-color: ${({ theme }) => (theme.isDarkMode ? '#444' : '#1a73e8')}; /* Change to your desired color */
    color: ${({ theme }) => (theme.isDarkMode ? '#fff' : '#fff')}; /* Text color */
`;

const Logo = styled.img`
    height: 40px; /* Adjust height to fit well in the navbar */
    width: auto; /* Keep aspect ratio */
`;

const RightContainer = styled.div`
    display: flex; /* Use flexbox for right items */
    align-items: center; /* Center vertically */
    margin-left: auto; /* Push the container to the right */
`;

const LogoutButton = styled.button`
    background: transparent; 
    color: inherit; /* Keep text color */
    border: none; 
    cursor: pointer; 
    font-size: 16px; /* Adjust font size if needed */
    
    &:hover {
        text-decoration: underline; /* Add hover effect */
    }
`;

const ToggleButton = styled.button`
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    font-size: 16px;
    margin-right: 15px; /* Add gap between ToggleButton and Logout button */
`;

const Navbar = ({ logout }) => {
    const { toggleTheme, isDarkMode } = useTheme(); // Get theme state and toggle function

    return (
        <NavbarContainer theme={{ isDarkMode }}>
            <Logo src="/Colorful Modern Infinity Technology Free Logo.png" alt="Logo" /> {/* Adjust the logo path if necessary */}
            <RightContainer>
                <ToggleButton onClick={toggleTheme}>
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </ToggleButton>
                <LogoutButton onClick={logout}>Logout</LogoutButton>
            </RightContainer>
        </NavbarContainer>
    );
};

export default Navbar;
