import React, { useEffect } from 'react';
import { Link, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { FaTasks, FaPlus, FaColumns, FaHome } from 'react-icons/fa'; // FaHome for Home icon
import TaskList from './TaskList';
import TaskDetail from './TaskDetail';
import CreateTask from './TaskForm';
import Navbar from './Navbar';
import Board from './Board';
import Home from './Home'; // Import the new Home component
import { useAuth } from '../context/AuthContext';
import { useTheme } from './ThemeProvider'; // Import useTheme
import styled from 'styled-components';

const DashboardContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    background-color: ${({ theme }) => (theme.isDarkMode ? '#333' : '#f9f9f9')};
    color: ${({ theme }) => (theme.isDarkMode ? '#fff' : '#000')};
    min-height: 100vh;
`;

const MainContent = styled.div`
    display: flex;
    flex: 1;
`;

const Sidebar = styled.div`
    width: 200px;
    background-color: ${({ theme }) => (theme.isDarkMode ? '#555' : '#e1f5fe')};
    padding: 20px;
    border-radius: 8px;
    margin-right: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const SidebarLink = styled(Link)`
    display: flex;
    align-items: center;
    margin: 15px 0; 
    text-decoration: none;
    color: ${({ theme }) => (theme.isDarkMode ? '#fff' : '#333')};
    font-weight: 500;

    &:hover {
        color: #1a73e8;
    }
    
    svg {
        margin-right: 10px; 
    }
`;

const ContentContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-top: 20px;
`;

const TaskListContainer = styled.div`
    flex: 1;
    background-color: ${({ theme }) => (theme.isDarkMode ? '#444' : '#ffffff')};
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    padding: 20px;
    margin-top: 10px;
    overflow-y: auto;
`;

const Dashboard = () => {
    const { user, logout } = useAuth();
    const { isDarkMode } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!user) {
            navigate('/login'); 
        } else if (location.pathname === '/dashboard') {
            navigate('/dashboard/home'); // Redirect to Home page on login
        }
    }, [user, navigate, location]);

    return (
        <DashboardContainer theme={{ isDarkMode }}>
            <Navbar logout={logout} />
            <MainContent>
                <Sidebar theme={{ isDarkMode }}>
                    <SidebarLink to="/dashboard/home" theme={{ isDarkMode }}>
                        <FaHome /> Home
                    </SidebarLink>
                    <SidebarLink to="/dashboard/tasks" theme={{ isDarkMode }}>
                        <FaTasks /> Tasks
                    </SidebarLink>
                    <SidebarLink to="/dashboard/tasks/new" theme={{ isDarkMode }}>
                        <FaPlus /> Add Task
                    </SidebarLink>
                    <SidebarLink to="/dashboard/board" theme={{ isDarkMode }}>
                        <FaColumns /> Kanban Board
                    </SidebarLink>
                </Sidebar>
                <ContentContainer>
                    <TaskListContainer theme={{ isDarkMode }}>
                        <Routes>
                            <Route path="home" element={<Home />} /> {/* Add Home route */}
                            <Route path="tasks" element={<TaskList />} />
                            <Route path="tasks/:taskId" element={<TaskDetail />} />
                            <Route path="tasks/new" element={<CreateTask />} />
                            <Route path="board" element={<Board />} />
                        </Routes>
                    </TaskListContainer>
                </ContentContainer>
            </MainContent>
        </DashboardContainer>
    );
};

export default Dashboard;
