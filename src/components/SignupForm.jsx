import { useState } from "react"
import Error from "./Error"
import Input from "./Input"
import { Link } from "react-router-dom"
import signUpStyles from '../stylesheets/signup-form.module.css'
import useSignup from "../hooks/useSignup"

export default function SignupForm() {
    
    const [signup, success, errors] = useSignup()
    
    function signupHandler(e) {
        console.log("Sign up handler")
        e.preventDefault()
        
        const data = Object.fromEntries(
            new FormData(e.target)
        )
        signup(data)
    }

    return (
        <form 
            className={signUpStyles.wrapper}
            onSubmit={signupHandler} noValidate={false}>
            <h1>Create account</h1>
            <hr/>
            <div className={signUpStyles.group}>
                <Input
                    type={'text'}
                    placeholder={'Username'}
                    name={"username"} /> 
                <Error name={'username'} errors={errors} />
            </div>
            <div className={signUpStyles.group}>
                <Input
                    type={'email'}
                    placeholder={'E-mail'}
                    name={"email"} /> 
                <Error name={'email'} errors={errors}/>
            </div>
            <div className={signUpStyles.group}>
                <Input
                    type={'password'}
                    placeholder={'Password'}
                    name={"password"} />
                <Error name={'password'} errors={errors} />
            </div>
            <div className={signUpStyles.group}>
                <Input
                    type={'password'}
                    placeholder={'Confirm password'}
                    name={"confirmPassword"} />
                <Error name={'confirmPassword'} errors={errors} />
            </div>
            <button> sign up </button>
            <Link to="/login">Already got an account?</Link>
        </form>
    )
}