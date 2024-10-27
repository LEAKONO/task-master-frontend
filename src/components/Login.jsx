// src/components/Login.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Corrected path
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'; // Import styled-components

// Styled Components
const LoginWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(to bottom, #3E5151, #DECBA4); /* Same background as landing page */
`;

const LoginCard = styled.div`
    background: rgba(255, 255, 255, 0.9); /* Translucent background */
    border-radius: 15px;
    padding: 40px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    text-align: center;
    max-width: 400px;
    width: 100%;
`;

const LoginTitle = styled.h2`
    font-size: 2rem;
    color: #1a73e8;
    margin-bottom: 20px;
`;

const InputField = styled.input`
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 1rem;
`;

const SubmitButton = styled.button`
    background-color: #1a73e8;
    color: white;
    width: 100%;
    margin: 10px 0;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    padding: 10px;
    transition: background-color 0.3s ease, transform 0.3s ease;

    &:hover {
        background-color: #0a5eab;
        transform: translateY(-3px);
    }

    &:focus {
        outline: none;
    }

    &:active {
        transform: translateY(1px);
    }
`;

const ErrorMessage = styled.p`
    color: red;
    margin-bottom: 20px;
`;

const Login = () => {
    const { login, error } = useAuth(); // Use the AuthContext
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        await login(email, password);
        navigate('/dashboard'); // Redirect to dashboard after successful login
    };

    return (
        <LoginWrapper>
            <LoginCard>
                <LoginTitle>Login</LoginTitle>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <form onSubmit={handleLogin}>
                    <InputField
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <InputField
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <SubmitButton type="submit">Login</SubmitButton>
                </form>
            </LoginCard>
        </LoginWrapper>
    );
};

export default Login;
