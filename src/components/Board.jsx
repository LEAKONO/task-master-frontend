import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { StrictModeDroppable } from './StrictModeDroppable'; // Import the custom component

const initialTasks = {
    'To Do': [],
    'In Progress': [],
    'Completed': [],
};

// Define colors for each column based on the theme
const getColumnStyles = (theme) => ({
    'To Do': {
        backgroundColor: theme.isDarkMode ? '#3e8e41' : '#c3e6cb', // Darker green for dark mode, lighter green for light mode
    },
    'In Progress': {
        backgroundColor: theme.isDarkMode ? '#d6a829' : '#ffeeba', // Darker yellow for dark mode, lighter yellow for light mode
    },
    'Completed': {
        backgroundColor: theme.isDarkMode ? '#5a6268' : '#d1ecf1', // Darker gray for dark mode, lighter blue for light mode
    },
});

const Board = () => {
    const { user, getToken } = useAuth();
    const token = getToken();
    const [tasks, setTasks] = useState(initialTasks);
    const [theme, setTheme] = useState({ isDarkMode: false }); // Adjust this based on your actual theme context

    useEffect(() => {
        if (user) {
            const fetchTasks = async () => {
                try {
                    const response = await axios.get('http://127.0.0.1:5000/routes/tasks', {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    const fetchedTasks = response.data.tasks;

                    const updatedTasks = { 'To Do': [], 'In Progress': [], 'Completed': [] };

                    fetchedTasks.forEach((task) => {
                        updatedTasks[task.status].push(task);
                    });

                    setTasks(updatedTasks);
                } catch (error) {
                    console.error('Error fetching tasks:', error);
                }
            };

            fetchTasks();
        }
    }, [user, token]);

    const handleDragEnd = async (result) => {
        console.log(result); // Log the entire result to see its structure

        if (!result.destination) return;

        const { source, destination } = result;

        const sourceColumn = source.droppableId;
        const destinationColumn = destination.droppableId;

        if (sourceColumn === destinationColumn) return; // If dropped in the same column, do nothing

        const sourceTasks = Array.from(tasks[sourceColumn]);
        const [removed] = sourceTasks.splice(source.index, 1);

        const destinationTasks = Array.from(tasks[destinationColumn]);
        destinationTasks.splice(destination.index, 0, removed);

        setTasks({
            ...tasks,
            [sourceColumn]: sourceTasks,
            [destinationColumn]: destinationTasks,
        });

        try {
            await axios.put(
                `http://127.0.0.1:5000/routes/tasks/${removed.id}`,
                { status: destinationColumn },  // Pass the new status
                { headers: { Authorization: `Bearer ${token}` } }  // Ensure token is included
            );
            console.log(`Task ${removed.id} updated to ${destinationColumn} successfully`);
        } catch (error) {
            console.error('Error updating task:', error);
            // Optionally, you could revert the task state if the request fails
        }
    };

    return (
        <div>
            <h1>Kanban Board</h1>
            <DragDropContext onDragEnd={handleDragEnd}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {Object.keys(tasks).map((columnName) => (
                        <StrictModeDroppable key={columnName} droppableId={columnName}>
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    style={{
                                        width: '30%',
                                        padding: '20px',
                                        background: getColumnStyles(theme)[columnName].backgroundColor, // Set the background color based on the column and theme
                                        borderRadius: '8px',
                                        margin: '0 10px',
                                    }}
                                >
                                    <h2 style={{ color: theme.isDarkMode ? '#fff' : '#000' }}>{columnName}</h2>
                                    {tasks[columnName].map((task, index) => (
                                        <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={{
                                                        ...provided.draggableProps.style,
                                                        userSelect: 'none',
                                                        padding: '10px',
                                                        margin: '10px 0',
                                                        background: snapshot.isDragging ? '#fff' : '#fff',
                                                        border: '1px solid #ccc',
                                                        borderRadius: '5px',
                                                        boxShadow: snapshot.isDragging
                                                            ? '0 2px 8px rgba(0, 0, 0, 0.2)'
                                                            : 'none',
                                                    }}
                                                >
                                                    <TaskCard task={task} />
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder} {/* Placeholder to avoid layout shift */}
                                </div>
                            )}
                        </StrictModeDroppable>
                    ))}
                </div>
            </DragDropContext>
        </div>
    );
};

export default Board;
