import style from '../stylesheets/LoginForm.module.css';
import Input from './Input';
import useLogin from '../hooks/useLogin';
import { useEffect, useState } from 'react';
import Loader from './Loader';
import { Link } from 'react-router-dom';

useState;
export default function LoginForm() {
    const [data, setData] = useState({
        email: {
            value: '',
            error: '',
        },
        password: {
            value: '',
            error: '',
        },
    });
    const { login, errors, status } = useLogin();

    const resetErrors = () => {
        const dataCopy = structuredClone(data);
        for (const property in dataCopy) {
            dataCopy[property].error = '';
        }

        setData(dataCopy);
    };

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
        const dataCopy = structuredClone(data);
        let hasErrors = false;
        const email = dataCopy.email.value;
        const password = dataCopy.password.value;
        if (!email) {
            dataCopy.email.error = 'Please enter your email!';
            hasErrors = true;
        }

        if (email) {
            const emailReg = /^[^@]+@[^@]+\.[^@]+$/;
            if (!emailReg.test(email)) {
                dataCopy.email.error = 'Invalid email address!';
                hasErrors = true;
            }
        }

        if (!password) {
            dataCopy.password.error = 'Please enter your password!';
        }

        if (hasErrors) {
            setData(dataCopy);
            return;
        }

        resetErrors();

        const loginData = {
            email: data.email.value,
            password: data.password.value,
        };

        login(loginData);
    };

    useEffect(() => {
        const copyData = structuredClone(data);
        if (status === 'error') {
            if (errors) {
                if (errors?.auth) {
                    copyData.email.error = errors.auth;
                    // copyData.password.error = errors.auth;
                }

                if (errors.password) {
                    copyData.password.error = errors.password;
                }

                if (errors.email) {
                    copyData.password.error = errors.email;
                }
            }
            setData(copyData);
        }
    }, [errors]);
    return (
        <form
            className={style.form}
            action="POST"
            noValidate
            onSubmit={onSubmitHandler}
        >
            <div>
                <h1 className={style.title}>Welcome back</h1>
                <h2 className={style.subtitle}>Enter your account details.</h2>
            </div>

            <div className={style.content}>
                <Input
                    type={'email'}
                    name={'email'}
                    placeholder={'Enter your email'}
                    label={'email'}
                    error={data.email.error}
                    id={'email'}
                    value={data.email.value}
                    onChange={onChangeHandler}
                />

                <Input
                    type={'password'}
                    name={'password'}
                    placeholder={'Enter your password'}
                    label={'password'}
                    id={'password'}
                    value={data.password.value}
                    error={data.password.error}
                    onChange={onChangeHandler}
                />
            </div>
            {status !== 'pending' && (
                <button className="primary">Log in</button>
            )}
            {status === 'pending' && <Loader />}
            <Link className={style.link} to={'/signup'}>
                No account? Sign up here.
            </Link>
        </form>
    );
}
