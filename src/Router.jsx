import  { 
    createBrowserRouter,
} from 'react-router-dom'

import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />
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