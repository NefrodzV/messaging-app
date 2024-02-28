import  { 
    createBrowserRouter,
} from 'react-router-dom'

import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import UserList from './components/UserList'
import ChatList from './components/ChatList'
import Chat from './components/Chat'
import CreateChat from './components/CreateChat'

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
        children: [
            {
                index:true,
                path:'chats',
                element: <ChatList/>
            },
            {
                path:'users',
                element: <UserList />
            },
            {
                path: "chat/:id",
                element: <Chat />
            },
            {
                path:'chat',
                element: <CreateChat />
            }
        ]
    },
    {
        path: '/login',
        element: <LoginPage />,
        index: true
    },
    
    {
        path: "/signup",
        element: <SignupPage />
    },
    
])

export default router