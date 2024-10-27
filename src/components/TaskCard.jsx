// src/components/TaskCard.js
import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
    padding: 10px;
    border: 1px solid ${({ theme }) => (theme.isDarkMode ? '#444' : '#ccc')}; // Change border color based on theme
    border-radius: 5px;
    background-color: ${({ theme }) => (theme.isDarkMode ? '#555' : '#fff')}; // Background color based on theme
    cursor: pointer;
`;

const TaskTitle = styled.h4`
    margin: 0;
    color: ${({ theme }) => (theme.isDarkMode ? '#fff' : '#000')}; // Text color based on theme
`;

const TaskDescription = styled.p`
    margin: 5px 0;
    color: ${({ theme }) => (theme.isDarkMode ? '#bbb' : '#666')}; // Description color based on theme
`;

const TaskCard = ({ task }) => {
    return (
        <CardContainer>
            <TaskTitle>{task.title}</TaskTitle>
            <TaskDescription>{task.description}</TaskDescription>
            {/* Add more task details as necessary */}
        </CardContainer>
    );
};

export default TaskCard;
