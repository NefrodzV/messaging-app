import loginStyles from '../stylesheets/login.module.css'
import LoginForm from '../components/LoginForm'
import { useContext, useEffect } from 'react'
import { UserContext } from '../contexts/UserContext'
import { useNavigationType } from 'react-router-dom'

export default function LoginPage() {
    const navType = useNavigationType()
    const { resetToken } = useContext(UserContext)

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