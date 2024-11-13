import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import CommentForm from './CommentForm';
import { useAuth } from '../context/AuthContext';

const TaskDetailContainer = styled.div`
    padding: 20px;
`;

const TaskDetail = () => {
    const { taskId } = useParams();
    const { user } = useAuth(); 
    const navigate = useNavigate();

    const [task, setTask] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        if (!user) {
            navigate('/login'); // Redirect if not authenticated
            return;
        }

        const fetchTaskDetails = async () => {
            try {
                const token = localStorage.getItem('token'); 
                const response = await axios.get(`https://task-master-qeu7.onrender.com/routes/tasks/${taskId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setTask(response.data.task);  // Set task details, including assigned_to_email
            } catch (error) {
                console.error('Error fetching task details:', error);
                setError('Failed to fetch task details.');
            } finally {
                setLoading(false); 
            }
        };

        const fetchComments = async () => {
            try {
                const token = localStorage.getItem('token'); 
                const response = await axios.get(`https://task-master-qeu7.onrender.com/routes/tasks/${taskId}/comments`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setComments(response.data.comments);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchTaskDetails();
        fetchComments();
    }, [taskId, user, navigate]);

    const handleCommentAdded = () => {
        axios.get(`https://task-master-qeu7.onrender.com/routes/tasks/${taskId}/comments`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        }).then((response) => {
            setComments(response.data.comments);
        });
    };

    if (loading) {
        return <p>Loading task details...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <TaskDetailContainer>
            {task ? (
                <>
                    <h2>{task.title}</h2>
                    <p>{task.description}</p>
                    <p><strong>Due Date:</strong> {task.due_date || "No due date"}</p>
                    <p><strong>Priority:</strong> {task.priority || "No priority set"}</p>
                    <p><strong>Completion:</strong> {task.completion_percentage || 0}%</p>
                    <p><strong>Assigned to Email:</strong> {task.assigned_to_email || "Not assigned"}</p> {/* New field for assigned email */}

                    <h3>Comments:</h3>
                    <ul>
                        {comments.map(comment => (
                            <li key={comment.id}>{comment.content}</li>
                        ))}
                    </ul>
                    
                    {/* Now placing the form after the comments */}
                    <CommentForm taskId={taskId} onCommentAdded={handleCommentAdded} />
                </>
            ) : (
                <p>Task not found.</p>
            )}
        </TaskDetailContainer>
    );
};

export default TaskDetail;
