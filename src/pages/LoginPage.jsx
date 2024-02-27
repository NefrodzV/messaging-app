import loginStyles from '../stylesheets/login.module.css'
import LoginForm from '../components/LoginForm'
import { useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'

export default function LoginPage() {
    const navigate = useNavigate()
    const { isLoggedIn } = useContext(UserContext)
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        if(isLoggedIn)  {
            navigate('/chats')
            return
        } else {
            setLoading(false)
        }
    },[isLoggedIn])

    return (
        <>
        {
            // TODO IMPLEMENT LOADING ELEMENT
            loading ? <h1>Loading...</h1> :
                <div className={loginStyles.page}>
                    <div className='brand'>Logo</div>
                    <LoginForm />
                </div>
        }
        </> 
    )
}