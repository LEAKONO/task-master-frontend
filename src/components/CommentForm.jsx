import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext'; // Import your custom Auth context

const CommentFormContainer = styled.div`
    margin-top: 20px;
`;

const TextArea = styled.textarea`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
`;

const Button = styled.button`
    padding: 10px;
`;

const CommentForm = ({ taskId, onCommentAdded }) => {
    const [comment, setComment] = useState('');
    const [error, setError] = useState(null); // State to hold error messages
    const { user } = useAuth(); // Get the user from Auth context

    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        if (!user || !user.token) {
            console.error('User is not authenticated');
            setError('You must be logged in to submit a comment.');
            return; // Prevent submission if user is not authenticated
        }

        try {
            await axios.post(
                `https://task-master-qeu7.onrender.com/routes/tasks/${taskId}/comments`,
                { content: comment },
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`, // Use token from user context
                    },
                }
            );
            setComment(''); // Clear the comment input
            onCommentAdded(); // Call the callback to refresh comments
            setError(null); // Clear any previous error
        } catch (error) {
            console.error('Error adding comment', error);
            setError('Failed to add comment. Please try again later.'); // Show error message
        }
    };

    return (
        <CommentFormContainer>
            <form onSubmit={handleCommentSubmit}>
                <TextArea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment"
                    required
                />
                <Button type="submit">Submit Comment</Button>
                {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
            </form>
        </CommentFormContainer>
    );
};

export default CommentForm;
