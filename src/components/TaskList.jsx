import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useTheme } from '../components/ThemeProvider';

const Container = styled.div`
    padding: 20px;
    max-width: 800px;
    margin: auto;
    background-color: ${({ theme }) => theme.isDarkMode ? '#333' : '#fff'};
    color: ${({ theme }) => theme.isDarkMode ? '#fff' : '#000'};
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
    text-align: center;
    color: ${({ theme }) => theme.isDarkMode ? '#fff' : '#333'};
`;

const SearchInput = styled.input`
    width: 95%;  /* Reduced width slightly */
    padding: 8px; /* Slightly smaller padding */
    margin-bottom: 20px;
    border: 1px solid ${({ theme }) => theme.isDarkMode ? '#555' : '#ccc'};
    border-radius: 4px;
    background-color: ${({ theme }) => theme.isDarkMode ? '#444' : '#fff'};
    color: ${({ theme }) => theme.isDarkMode ? '#fff' : '#000'};
`;

const ErrorMessage = styled.p`
    color: red;
    text-align: center;
`;

const TaskItem = styled.li`
    list-style-type: none;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid ${({ theme }) => theme.isDarkMode ? '#555' : '#e0e0e0'};
    border-radius: 4px;
    background-color: ${({ theme }) => theme.isDarkMode ? '#444' : '#f9f9f9'};
`;

const TaskTitle = styled.h2`
    margin: 0;
    font-size: 1.2em;
    color: ${({ theme }) => theme.isDarkMode ? '#fff' : '#333'};
`;

const TaskDetails = styled.p`
    margin: 5px 0;
    color: ${({ theme }) => theme.isDarkMode ? '#bbb' : '#555'};
`;

const CommentSection = styled.ul`
    padding-left: 20px;
    margin-top: 10px;
`;

const CommentItem = styled.li`
    list-style-type: disc;
    margin: 5px 0;
    color: ${({ theme }) => theme.isDarkMode ? '#ccc' : '#777'};
`;

const TaskList = () => {
    const { getToken } = useAuth();
    const { isDarkMode } = useTheme();
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState(''); // State for search query

    const fetchTasks = async (page = 1, perPage = 5) => {
        const token = getToken();

        if (!token) {
            setError('No token found. Please log in.');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get('https://task-master-qeu7.onrender.com/routes/tasks', {
                headers: { 'Authorization': `Bearer ${token}` },
                params: { page, per_page: perPage }
            });
            setTasks(response.data.tasks);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            if (error.response) {
                setError('Error fetching tasks: ' + (error.response.data.msg || 'Unknown error'));
            } else {
                setError('Error in request: ' + error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    // Filter tasks based only on the title
    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Container theme={{ isDarkMode }}>
            <Title theme={{ isDarkMode }}>Task List</Title>

            {/* Search Input */}
            <SearchInput
                theme={{ isDarkMode }}
                type="text"
                placeholder="Search tasks by title..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
            />

            {loading && <p>Loading tasks...</p>}
            {error && <ErrorMessage>{error}</ErrorMessage>}
            
            <ul>
                {filteredTasks.map(task => (
                    <TaskItem key={task.id} theme={{ isDarkMode }}>
                        <Link to={`/dashboard/tasks/${task.id}`}>
                            <TaskTitle theme={{ isDarkMode }}>{task.title}</TaskTitle>
                        </Link>
                        <TaskDetails theme={{ isDarkMode }}>{task.description}</TaskDetails>
                        <TaskDetails theme={{ isDarkMode }}>Due Date: {new Date(task.due_date).toLocaleString()}</TaskDetails>
                        <TaskDetails theme={{ isDarkMode }}>Priority: {task.priority}</TaskDetails>
                        <TaskDetails theme={{ isDarkMode }}>Completion: {task.completion_percentage}%</TaskDetails>

                        {/* Render Comments */}
                        {task.comments && task.comments.length > 0 && (
                            <CommentSection>
                                <h4>Comments:</h4>
                                {task.comments.map(comment => (
                                    <CommentItem key={comment.id} theme={{ isDarkMode }}>{comment.content}</CommentItem>
                                ))}
                            </CommentSection>
                        )}
                    </TaskItem>
                ))}
            </ul>
        </Container>
    );
};

export default TaskList;
