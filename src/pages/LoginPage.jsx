import style from '../stylesheets/Login.module.css'
import LoginForm from '../components/LoginForm'
import { useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'
import Loader from '../components/Loader'

export default function LoginPage() {
    const navigate = useNavigate()
    const { isLoggedIn, user } = useContext(UserContext)
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        if(isLoggedIn && user)  {
            navigate('/chats')
            return
        } else if(isLoggedIn) {
            setLoading(true)
        } else {
            setLoading(false)
        }
    },[isLoggedIn, user])

    return (
        <main className={style.page}>
            <img className={style.hero} src="" alt="" />

            <div className={style.container}>
               <LoginForm />
            </div>
            
        </main>
        // <>
        //     <div className={loginStyles.page}>
        //             <div className='logo-primary'>MSGR</div>
        //             { loading ? 
        //                 <Loader containerHeight={'auto'}  /> : 
        //                 <LoginForm />
        //             }
        //     </div>
        // </> 
    )
}