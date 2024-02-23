import loginFormStyles from '../stylesheets/login-form.module.css'
import Error from './Error'
import Input from './Input'
import { Link } from 'react-router-dom'
import useLogin from '../hooks/useLogin'


export default function LoginForm() {
    const [login, errors] = useLogin()
    
    function loginHandler(e) {
        e.preventDefault()
        const data = Object.fromEntries(
            new FormData(e.target)
        )
        login(data)
    }

    return (
        <form className={loginFormStyles.wrapper} onSubmit={loginHandler}>
            <h1>Login</h1>
            <div className="group">
                <Input type={"email"} name={"email"} placeholder={"Email"}/>
                <Error name={"email"} errors={errors}/>
            </div>
            <div className="group">
                <Input type={"password"} name={"password"} placeholder={"Password"}/>
                <Error name={"password"} errors={errors} />
                <Error name={'auth'} errors={errors} />
            </div>
                
            <button> log in</button>
            <Link to='/signup'>No account? Sign up</Link>
        </form>
    )
}