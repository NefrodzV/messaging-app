import  { 
    createBrowserRouter,
} from 'react-router-dom'

import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />
    },
    {
        path: "/signup",
        element: <SignUpPage />
    },
    {
        path: '/login',
        element: <LoginPage />
    }
])

export default router