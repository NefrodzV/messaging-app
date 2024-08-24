import SignupForm from '../components/SignupForm';
import style from '../stylesheets/SignupPage.module.css';

export default function SignUpPage() {
    return (
        <main className={style.page}>
            <SignupForm />
        </main>
    );
}
