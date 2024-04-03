import SignupForm from "../components/SignupForm";
import signUpStyles from '../stylesheets/signup.module.css'

export default function SignUpPage() {
    return(
        <div className={signUpStyles.page}>
            <div className="logo-primary">MSGR</div>
            <SignupForm />
        </div>
    )
}