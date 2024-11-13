import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../components/ThemeProvider';

const Container = styled.div`
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: ${({ theme }) => theme.isDarkMode ? '#333' : '#f9f9f9'};
    color: ${({ theme }) => theme.isDarkMode ? '#fff' : '#000'};
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
    margin-bottom: 20px;
    text-align: center;
    color: ${({ theme }) => theme.isDarkMode ? '#fff' : '#333'};
`;

const ErrorMessage = styled.p`
    color: red;
    text-align: center;
`;

const SuccessMessage = styled.p`
    color: green;
    text-align: center;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const FormGroup = styled.div`
    margin-bottom: 15px;
`;

const Label = styled.label`
    margin-bottom: 5px;
    font-weight: bold;
    color: ${({ theme }) => theme.isDarkMode ? '#fff' : '#333'};
`;

const Input = styled.input`
    padding: 10px;
    border: 1px solid ${({ theme }) => theme.isDarkMode ? '#555' : '#ccc'};
    border-radius: 4px;
    background-color: ${({ theme }) => theme.isDarkMode ? '#555' : '#fff'};
    color: ${({ theme }) => theme.isDarkMode ? '#fff' : '#000'};
    width: 100%;
`;

const TextArea = styled.textarea`
    padding: 10px;
    border: 1px solid ${({ theme }) => theme.isDarkMode ? '#555' : '#ccc'};
    border-radius: 4px;
    background-color: ${({ theme }) => theme.isDarkMode ? '#555' : '#fff'};
    color: ${({ theme }) => theme.isDarkMode ? '#fff' : '#000'};
    width: 100%;
    resize: vertical;
`;

const Select = styled.select`
    padding: 10px;
    border: 1px solid ${({ theme }) => theme.isDarkMode ? '#555' : '#ccc'};
    border-radius: 4px;
    background-color: ${({ theme }) => theme.isDarkMode ? '#555' : '#fff'};
    color: ${({ theme }) => theme.isDarkMode ? '#fff' : '#000'};
    width: 100%;
`;

const Button = styled.button`
    padding: 10px;
    border: none;
    border-radius: 4px;
    background-color: #4caf50;
    color: white;
    font-size: 16px;
    cursor: pointer;

    &:hover {
        background-color: #45a049;
    }
`;

const CreateTask = () => {
    const { user, getToken } = useAuth();
    const { isDarkMode } = useTheme();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('normal');
    const [assignedToEmail, setAssignedToEmail] = useState('');
    const [completionPercentage, setCompletionPercentage] = useState(0);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const createTask = async (taskData) => {
        try {
            const token = getToken();
            const response = await axios.post('https://task-master-qeu7.onrender.com/routes/tasks', taskData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const taskData = {
            title,
            description,
            due_date: dueDate ? formatDate(dueDate) : null,
            priority,
            assigned_to_email: assignedToEmail || user?.email,
            completion_percentage: parseInt(completionPercentage, 10),
        };

        try {
            await createTask(taskData);
            setSuccess('Task created successfully!');
            setTitle('');
            setDescription('');
            setDueDate('');
            setAssignedToEmail('');
            setCompletionPercentage(0);
            navigate('/dashboard/tasks');
        } catch (err) {
            setError(err.response?.data?.error || 'Task creation failed');
        }
    };

    return (
        <Container>
            <Title>Create Task</Title>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {success && <SuccessMessage>{success}</SuccessMessage>}

            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Title</Label>
                    <Input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </FormGroup>

                <FormGroup>
                    <Label>Description</Label>
                    <TextArea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </FormGroup>

                <FormGroup>
                    <Label>Due Date</Label>
                    <Input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                    />
                </FormGroup>

                <FormGroup>
                    <Label>Priority</Label>
                    <Select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    >
                        <option value="normal">Normal</option>
                        <option value="high">High</option>
                        <option value="low">Low</option>
                    </Select>
                </FormGroup>

                <FormGroup>
                    <Label>Assign To (Email)</Label>
                    <Input
                        type="email"
                        value={assignedToEmail}
                        onChange={(e) => setAssignedToEmail(e.target.value)}
                        placeholder="Leave blank to assign to yourself"
                    />
                </FormGroup>

                <FormGroup>
                    <Label>Completion Percentage</Label>
                    <Input
                        type="number"
                        min="0"
                        max="100"
                        value={completionPercentage}
                        onChange={(e) => setCompletionPercentage(e.target.value)}
                    />
                </FormGroup>

                <Button type="submit">Create Task</Button>
            </Form>
        </Container>
    );
};

export default CreateTask;
