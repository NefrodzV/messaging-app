import SignUpForm from "../../components/signup/SignUpForm";
import './sign-up-page.css'

export default function SignUpPage() {
    return(
        <div className="signup-page full-height full-width">
            <div className="brand">LOGO</div>
            <SignUpForm />
        </div>
    )
}