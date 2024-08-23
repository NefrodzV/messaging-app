import loginFormStyles from '../stylesheets/login-form.module.css'
import Error from './Error'
import Input from './Input'
import { Link } from 'react-router-dom'
import useLogin from '../hooks/useLogin'
import { useState } from 'react'

useState
export default function LoginForm() {

    const [errors, setErrors] = useState(null)
    
    const handleErrors = (name) => {
        if(!errors || errors == undefined) return ''
        if(Object.hasOwn(errors, name)) return errors[name]
        return ''
    }
    // const {login, errors, status } = useLogin()
    // 
    // function loginHandler(e) {
    //     e.preventDefault()
    //     const data = Object.fromEntries(
    //         new FormData(e.target)
    //     )
    //     login(data)
    // }

    return (

        <form action="">
            <h1>Welcome back</h1>
            <h2>Enter your account details to login.</h2>
            <Input 
                type={'text'} 
                name={'email'} 
                placeholder={'Enter your email'} 
                label={'email'} 
                error={handleErrors('email')}/>
            <button onClick={(e) => {
               e.preventDefault()
                if(errors) {
                    setErrors(null)
                    return
                }
                console.log('setting errors')
                setErrors({
                    email: 'Please enter a valid email!'
                })
            }}>Log in</button>
        </form>
        // <form className={loginFormStyles.wrapper} onSubmit={loginHandler}>
        //     <h1>Login</h1>
        //     <div className="group">
        //         <Input type={"email"} name={"email"} placeholder={"Email"}/>
        //         <Error name={"email"} errors={errors}/>
        //     </div>
        //     <div className="group">
        //         <Input type={"password"} name={"password"} placeholder={"Password"}/>
        //         <Error name={"password"} errors={errors} />
        //         <Error name={'auth'} errors={errors} />
        //     </div>
        //         
        //     <button disabled={status === 'pending'}> log in</button>
        //     <Link 
        //         to={status === 'pending' ? 'javascript:void(0)' : '/signup'}>
        //             No account? Sign up
        //     </Link>
        // </form>
    )
}