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
        path: '/:username',
        element: <HomePage />,
        children: [
            {
                index: true,
                path: 'chats',
                element: <ChatList />,
            },
            {
                path: 'chats/:id',
                element: <Chat />,
            },
            {
                path: 'chats/create',
                element: <Chat />,
            },
            {
                path: 'users',
                element: <UserList />,
            },

            {
                path: 'profile',
                element: <Profile />,
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
