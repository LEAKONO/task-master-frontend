// src/components/SignUp.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'; // Import styled-components

// Styled Components
const SignUpWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(to bottom, #3E5151, #DECBA4); /* Same background as landing page */
`;

const SignUpCard = styled.div`
    background: rgba(255, 255, 255, 0.9); /* Translucent background */
    border-radius: 15px;
    padding: 40px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    text-align: center;
    max-width: 400px;
    width: 100%;
`;

const SignUpTitle = styled.h2`
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

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:5000/auth/signup', { username, email, password });
      navigate('/login'); // Redirect to login page after successful sign-up
    } catch (error) {
      console.error('Sign up error', error);
    }
  };

  return (
    <SignUpWrapper>
      <SignUpCard>
        <SignUpTitle>Sign Up</SignUpTitle>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <InputField 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
          </div>
          <div>
            <label>Email:</label>
            <InputField 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              placeholder="you@example.com" // Placeholder for better UX
            />
          </div>
          <div>
            <label>Password:</label>
            <InputField 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <SubmitButton type="submit">Sign Up</SubmitButton>
        </form>
      </SignUpCard>
    </SignUpWrapper>
  );
};

export default SignUp;
