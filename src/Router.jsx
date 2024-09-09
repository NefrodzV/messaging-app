import { createBrowserRouter } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Chat from './components/Chat';
import { Navigate } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage';
import PageLayout from './components/PageLayout';
import ChatList from './components/ChatList';
import ChatAndProfileLayout from './components/ChatAndProfileLayout';
const router = createBrowserRouter([
    {
        path: '/',
        element: <PageLayout />,
        children: [
            {
                path: 'chats',
                element: <ChatAndProfileLayout />,
                children: [
                    {
                        path: ':chatId',
                        element: <Chat />,
                    },
                ],
            },
            {
                index: true,
                element: <Navigate to={'chats'} />,
            },

            {
                path: 'profile',
                element: <ChatAndProfileLayout />,
                children: [
                    {
                        index: true,
                        element: <ProfilePage />,
                    },
                ],
            },
        ],
    },
    // {
    //     path: '/chats',
    //     element: <HomePage />,
    //     children: [
    //         {
    //             path: ':chatId',
    //             element: <Chat />,
    //         },
    //     ],
    // },
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
