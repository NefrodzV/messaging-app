import { useState } from 'react'
import loginFormStyles from '../stylesheets/login-form.module.css'
import Error from './Error'
import Input from './Input'
import { Link ,useNavigate } from 'react-router-dom'

export default function LoginForm() {
    const navigate = useNavigate()
   

    function login() {
        // navigate to home page if successful
        navigate('/')
    }

    return (
        <form className={loginFormStyles.wrapper}>
            <h1>Login</h1>
            <div className="group">
                <Input type={"email"} name={"email"} placeholder={"Email"}/>
                <Error />
            </div>
            <div className="group">
                <Input type={"password"} name={"password"} placeholder={"Password"}/>
                <Error />
            </div>
            <button onClick={login}>log in</button>
            <Link to='/signup'>No account? Sign up</Link>
        </form>
    )
}