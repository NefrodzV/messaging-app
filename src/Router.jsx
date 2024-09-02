import { createBrowserRouter } from 'react-router-dom';

import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import UserList from './components/UserList';
import ChatList from './components/ChatList';
import Chat from './components/Chat';
import CreateChat from './components/CreateChat';
import Profile from './components/Profile';
import { Navigate } from 'react-router-dom';
const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/login" replace={true} />,
    },
    {
        path: '/chats',
        element: <HomePage />,
        children: [
            {
                path: ':chatId',
                element: <Chat />,
            },
        ],
    },
    {
        path: '/login',
        element: <LoginPage />,
        index: true,
    },

    {
        path: '/signup',
        element: <SignupPage />,
    },
]);

export default router;
