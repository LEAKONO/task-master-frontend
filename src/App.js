// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Correct path
import { ThemeProvider } from './components/ThemeProvider'; // Import ThemeProvider
import LandingPage from './components/LandingPage'; // Import your LandingPage
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
    return (
        <ThemeProvider> {/* Wrap the entire app with ThemeProvider */}
            <AuthProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<LandingPage />} /> {/* LandingPage as homepage */}
                        <Route path="/login" element={<Login />} />   {/* Route to Login */}
                        <Route path="/signup" element={<Signup />} /> {/* Route to Signup */}
                        <Route
                            path="/dashboard/*"
                            element={
                                <PrivateRoute>
                                    <Dashboard />
                                </PrivateRoute>
                            }
                        />
                    </Routes>
                </Router>
            </AuthProvider>
        </ThemeProvider>
    );
};

export default App;
