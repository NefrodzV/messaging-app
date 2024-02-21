import loginStyles from '../stylesheets/login.module.css'
import LoginForm from '../components/LoginForm'

export default function LoginPage() {
    return (
        <div className={loginStyles.page}>
            <div className='brand'>Logo</div>
            <LoginForm />
        </div>
    )
}