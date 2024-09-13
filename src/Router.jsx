import { createBrowserRouter, redirect } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import { Navigate } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage';
import { Profile, Chat, PageLayout, ChatAndProfileLayout } from './components';
import { withUserProvider } from './utils/utils.jsx';
const router = createBrowserRouter([
    {
        path: '/',
        element: withUserProvider(<PageLayout />),
        loader: async () => {
            const user = { username: 'dummy user', lastChat: 'lastChatId' };
            if (!user) return redirect('/login');
            return user;
        },
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
                        element: <Profile />,
                    },
                ],
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
