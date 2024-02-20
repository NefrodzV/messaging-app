import SignUpForm from "../components/SignUpForm";
import signUpStyles from '../stylesheets/signup.module.css'

export default function SignUpPage() {
    return(
        <div className={signUpStyles.page}>
            <div className="brand">LOGO</div>
            <SignUpForm />
        </div>
    )
}