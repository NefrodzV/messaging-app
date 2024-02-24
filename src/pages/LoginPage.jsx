import loginStyles from '../stylesheets/login.module.css'
import LoginForm from '../components/LoginForm'
import {  useEffect } from 'react'
import { useNavigationType } from 'react-router-dom'
import useUserContext from '../hooks/useUserContext'

export default function LoginPage() {
    const navType = useNavigationType()
    const { resetToken } = useUserContext()
    
    useEffect(() => {
        if(navType === "POP") {
            resetToken()
        }
    },[navType, resetToken])

    return (
        <div className={loginStyles.page}>
            <div className='brand'>Logo</div>
            <LoginForm />
        </div>

        
    )
}