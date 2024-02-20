import { useState } from "react"
import Error from "./Error"
import Input from "./Input"
import { Link } from "react-router-dom"
import signUpStyles from '../stylesheets/signup-form.module.css'
export default function RegisterForm() {
    
    const [errors, setErrors] = useState(null)
    
    function registerHandler(e) {
        e.preventDefault()
        
        const data = Object.fromEntries(
            new FormData(e.target)
        )
        register(data)
    }

    async function register(data) {
        try {
            const request = await fetch(
            'http://localhost:3000/api/session/register',
            {
                method: 'post',
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(data)
            })

            const response = await request.json()
            
            if(request.status === 422) {
                setErrors(response.errors)
            }
        } catch(e) {
            console.log(e)
        }
    }

    return (
        <form 
            className={signUpStyles.wrapper}
            onSubmit={registerHandler} noValidate={false}>
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
            <button onClick={register} value={"sign up"}> sign up </button>
            <Link to="/login">Already got an account?</Link>
        </form>
    )
}