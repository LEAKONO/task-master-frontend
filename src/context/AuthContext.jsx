import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const login = async (email, password) => {
        try {
            const response = await axios.post('https://task-master-qeu7.onrender.com/auth/login', { email, password });
            const token = response.data.token || response.data.access_token;

            if (token) {
                localStorage.setItem('token', token);  // Save token in localStorage
                setUser({ email, token });             // Save token in state
                setError(null);
            } else {
                setError('No token found in response');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError(err.response?.data?.error || 'Login failed');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const getToken = () => {
        const token = localStorage.getItem('token');
        return token;
    };

    const checkUserLoggedIn = useCallback(() => {
        const token = getToken();
        if (token) {
            setUser({ email: 'dummy@example.com', token }); // Update this logic based on your token validation
        }
        setLoading(false);
    }, []); // Dependencies for getToken

    useEffect(() => {
        checkUserLoggedIn();
    }, [checkUserLoggedIn]); // Now includes checkUserLoggedIn

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, error, getToken }}>
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
};
