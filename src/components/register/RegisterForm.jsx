import { useState } from "react"
import Error from "../error/Error"
import Input from "../input/Input"
import './register.css'

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
        <form className="register centered"onSubmit={registerHandler}>
            <h1>Create a new account</h1>
            <div className="group">
                <Input
                    type={'text'}
                    placeholder={'Username'}
                    name={"username"} /> 
                <Error name={'username'} errors={errors} />
            </div>
            <div className="group">
                <Input
                    type={'email'}
                    placeholder={'E-mail'}
                    name={"email"} /> 
                <Error name={'email'} errors={errors}/>
            </div>
            <div className="group">
                <Input
                    type={'password'}
                    placeholder={'Password'}
                    name={"password"} />
                <Error name={'password'} errors={errors} />
            </div>
            <div className="group">
                <Input
                    type={'password'}
                    placeholder={'Confirm password'}
                    name={"confirmPassword"} />
                <Error name={'confirmPassword'} errors={errors} />
            </div>
            <button type="submit">register</button>
        </form>
    )
}