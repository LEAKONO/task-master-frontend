// src/components/SignUp.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Styled Components (unchanged)
const SignUpWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to bottom, #3E5151, #DECBA4);
`;

const SignUpCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
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
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error message
    try {
      const response = await axios.post(
        'https://task-master-qeu7.onrender.com/auth/signup',
        { username, email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );
      navigate('/login');
    } catch (error) {
      console.error('Sign up error', error.response?.data || error);
      setErrorMessage(error.response?.data?.error || "Sign up failed. Please try again.");
    }
  };

  return (
    <SignUpWrapper>
      <SignUpCard>
        <SignUpTitle>Sign Up</SignUpTitle>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
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
              placeholder="you@example.com" 
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
