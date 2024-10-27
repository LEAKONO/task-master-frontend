// src/components/PrivateRoute
// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { user } = useAuth(); // Access the user context

    return user ? children : <Navigate to="/" />; // Redirect to login if not authenticated
};

export default PrivateRoute;
