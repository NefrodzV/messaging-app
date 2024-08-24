import Input from './Input';
import { Link } from 'react-router-dom';
import style from '../stylesheets/SignupForm.module.css';
import useSignup from '../hooks/useSignup';
import { useState } from 'react';
export default function SignupForm() {
    const [data, setData] = useState({
        username: {
            value: '',
            error: '',
        },
        email: {
            value: '',
            error: '',
        },
        password: {
            value: '',
            error: '',
        },
        confirmPassword: {
            value: '',
            error: '',
        },
    });
    const { signup, status, errors, reset } = useSignup();

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const text = e.target.value;
        if (Object.hasOwn(name, data)) {
            throw new Error('There no property in data with the name:' + name);
        }
        const dataCopy = structuredClone(data);
        dataCopy[name].value = text;
        setData(dataCopy);
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
    };

    return (
        <form
            className={style.form}
            onSubmit={onSubmitHandler}
            noValidate={true}
        >
            <div>
                <h1 className={style.title}>Create account</h1>
                <h2 className={style.subtitle}>Enter account information</h2>
            </div>
            <div className={style.content}>
                <Input
                    name={'username'}
                    id={'username'}
                    placeholder={'Enter your username'}
                    label={'username'}
                    isRequired={true}
                    onChange={onChangeHandler}
                    error={data.username.error}
                    value={data.username.value}
                />
                <Input
                    name={'email'}
                    id={'email'}
                    placeholder={'Enter your email'}
                    label={'email'}
                    isRequired={true}
                    onChange={onChangeHandler}
                    error={data.email.error}
                    value={data.email.value}
                />
                <Input
                    name={'password'}
                    id={'password'}
                    placeholder={'Enter your password'}
                    label={'password'}
                    isRequired={true}
                    onChange={onChangeHandler}
                    error={data.password.error}
                    value={data.password.value}
                />

                <Input
                    name={'confirmPassword'}
                    id={'confirmPassword'}
                    placeholder={'Enter your Confirm Password'}
                    label={'confirm password'}
                    isRequired={true}
                    onChange={onChangeHandler}
                    error={data.confirmPassword.error}
                    value={data.confirmPassword.value}
                />
            </div>
            <button className="primary">signup</button>
            <Link
                className={style.link}
                to={status === 'pending' ? 'javascript:void(0)' : '/login'}
            >
                Already got an account? Login here.
            </Link>
        </form>
    );
}
