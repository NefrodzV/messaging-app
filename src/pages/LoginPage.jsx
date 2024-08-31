import style from '../stylesheets/Login.module.css';
import LoginForm from '../components/LoginForm';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUser from '../hooks/useUser';

export default function LoginPage() {
    const { user } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        console.log(user);
        if (user) navigate('/' + user.username, { replace: true });
    }, [user]);
    return (
        <main className={style.page}>
            {/* <img className={style.hero} src="" alt="" /> */}
            <div className={style.container}>
                <LoginForm />
            </div>
        </main>
    );
}
