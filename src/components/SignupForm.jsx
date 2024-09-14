import Input from './Input';
import { Link } from 'react-router-dom';
import style from '../stylesheets/SignupForm.module.css';
import useSignup from '../hooks/useSignup';
import { useEffect, useState } from 'react';
import Loader from './Loader';

import { resetErrors } from '../utils/utils';
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
    const { signup, status, errors } = useSignup();
    const [show, setShow] = useState(false);

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
        resetErrors(data, setData);
        const copyData = structuredClone(data);
        const { username, password, email, confirmPassword } = copyData;
        let hasErrors = false;
        if (!username.value) {
            username.error = 'Please enter your username';
            hasErrors = true;
        }

        if (!email.value) {
            email.error = 'Please enter your email';
            hasErrors = true;
        }

        if (!password.value) {
            password.error = 'Please enter your password';
            hasErrors = true;
        }

        if (!confirmPassword.value) {
            confirmPassword.error = 'Please  Confirm Password';
            hasErrors = true;
        }

        if (email.value) {
            const emailReg = /^[^@]+@[^@]+\.[^@]+$/;
            if (!emailReg.test(email.value)) {
                email.error = 'Invalid email address';
                hasErrors = true;
            }
        }

        if (password.value) {
            if (password.value.length < 8) {
                password.error = 'Password must be at least 8  characters';
                return;
            }
        }

        if (confirmPassword.value) {
            if (confirmPassword.value !== password.value) {
                confirmPassword.error =
                    'Confirm Password is not equal password';
                hasErrors = true;
            }
        }

        if (hasErrors) {
            setData(copyData);
            return;
        }

        signup({
            email: data.email.value,
            username: data.username.value,
            password: data.password.value,
            confirmPassword: data.confirmPassword.value,
        });
    };

    useEffect(() => {
        // This sets the errors from the response
        if (errors) {
            const copyData = structuredClone(data);
            for (const property in data) {
                if (Object.hasOwn(data, property)) {
                    copyData[property].error = errors[property];
                }
            }
            setData(copyData);
        }
    }, [errors]);

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
                    placeholder={'Enter Confirm Password'}
                    label={'confirm password'}
                    isRequired={true}
                    onChange={onChangeHandler}
                    error={data.confirmPassword.error}
                    value={data.confirmPassword.value}
                />
            </div>
            {status === 'pending' ? (
                <Loader />
            ) : (
                <>
                    <button type="submit" className="primary">
                        sign up
                    </button>
                    <Link className={style.link} to={'/login'}>
                        Already got an account? Login here.
                    </Link>
                </>
            )}
            {status === 'success' && (
                <dialog className={style.success} open={true}>
                    <div className={style.container}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            fill="currentColor"
                        >
                            <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                        </svg>
                    </div>

                    <h1>Successful signup !</h1>
                    <Link to={'/login'}>Go to login</Link>
                </dialog>
            )}
        </form>
    );
}
