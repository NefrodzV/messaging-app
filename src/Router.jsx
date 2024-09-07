import { createBrowserRouter } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Chat from './components/Chat';
import { Navigate } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage';
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

    {
        path: '/profile',
        element: <ProfilePage />,
    },
]);

export default router;
