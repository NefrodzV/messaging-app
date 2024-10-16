import { createBrowserRouter, json, redirect } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import { Navigate } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage';
import {
    Profile,
    Chat,
    PageLayout,
    ChatAndProfileLayout,
    UserList,
} from './components';
import { withUserProvider } from './utils/utils.jsx';
import { getChat, getUser, getUsers } from './data';
import ErrorLayout from './components/ErrorLayout.jsx';
const router = createBrowserRouter([
    {
        path: '/',
        element: withUserProvider(<PageLayout />),
        loader: async () => {
            const user = await getUser();
            if (!user) return redirect('/login');
            redirect('/chats/' + user?.lastChat);
            return user;
        },

        errorElement: <ErrorLayout />,
        children: [
            {
                loader: () => {
                    return { text: 'chatsData' };
                },
                path: 'chats',
                element: <ChatAndProfileLayout />,
                children: [
                    {
                        path: ':chatId',
                        element: <Chat />,
                        loader: async ({ params }) => {
                            const chat = await getChat(params.chatId);
                            if (Object.hasOwn(chat, 'status')) {
                                throw json(
                                    { message: chat.message },
                                    {
                                        status: chat.status,
                                        statusText: chat.statusText,
                                    }
                                );
                            }

                            return chat;
                        },
                        errorElement: <ErrorLayout />,
                    },
                    {
                        index: true,
                        element: <UserList />,
                        loader: async () => {
                            const users = await getUsers();
                            return users;
                        },
                    },
                ],
            },
            {
                index: true,
                element: <Navigate to={'chats'} replace={true} />,
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

            {
                path: 'users',
                element: <ChatAndProfileLayout />,
                children: [
                    {
                        index: true,
                        element: <UserList />,
                        loader: async () => {
                            const users = await getUsers();
                            return users;
                        },
                    },
                ],
            },
        ],
    },
    {
        path: '/login',
        element: <LoginPage />,
        index: true,
        loader: async () => {
            // Get the user if it returns correctly
            // just navigate to home or root
            const user = await getUser();
            if (user) return redirect('/');
            return null;
        },
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
