import SignUpForm from "../components/SignUpForm";
import signUpStyles from '../stylesheets/sign-up.module.css'

export default function SignUpPage() {
    return(
        <div className="signup-page full-height full-width">
            <div className="brand">LOGO</div>
            <SignUpForm />
        </div>
    )
}