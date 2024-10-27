import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import styled from 'styled-components';
import { useTheme } from './ThemeProvider';

const HomeContainer = styled.div`
    position: relative;
    background-image: url('https://images.unsplash.com/photo-1611224885990-ab7363d1f2a9?q=80&w=1339&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
    background-size: cover;
    background-position: center;
    padding: 40px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    color: ${({ theme }) => (theme.isDarkMode ? '#fff' : '#000')};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 80vh;
    z-index: 1;
`;

const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: -1;
`;

const Title = styled.h1`
    font-size: 3rem;
    font-weight: bold;
    color: #fff;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.7);
    margin-bottom: 20px;
`;

const Text = styled.p`
    font-size: 1.5rem;
    color: #f0f0f0;
    margin-bottom: 30px;
    line-height: 1.6;
    max-width: 800px;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
`;

const Button = styled.button`
    padding: 15px 30px;
    font-size: 1.2rem;
    font-weight: 600;
    color: #fff;
    background-color: #1a73e8;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0f5bb5;
    }
`;

const Home = () => {
    const { isDarkMode } = useTheme();
    const navigate = useNavigate(); // useNavigate hook to programmatically navigate

    const handleButtonClick = () => {
        navigate('/dashboard/tasks/new'); // Navigate to the TaskForm page
    };

    return (
        <HomeContainer theme={{ isDarkMode }}>
            <Overlay />
            <Title>Got a Task? Let Us Handle It!</Title>
            <Text>
                At Task Master, we’re your go-to for all those little (and not-so-little) tasks that make your day smoother.
                Whether it’s managing  tasks, assigning responsibilities, tracking progress, or ensuring deadlines are met,
                our app empowers you to stay organized and in control, we’ve got your back.
            </Text>
            <Text>
                We’re like the coffee you need to get through the day—just a click away and always ready to help!
            </Text>
            <Button onClick={handleButtonClick}>Ready to Offload Some Tasks?</Button> {/* Add click handler */}
        </HomeContainer>
    );
};

export default Home;
