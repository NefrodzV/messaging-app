import style from '../stylesheets/Login.module.css';
import LoginForm from '../components/LoginForm';

export default function LoginPage() {
    return (
        <main className={style.page}>
            {/* <img className={style.hero} src="" alt="" /> */}
            <div className={style.container}>
                <LoginForm />
            </div>
        </main>
    );
}
