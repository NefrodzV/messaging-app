import Cookie from 'js-cookie'
import { UserContext } from '../contexts/UserContext'
import { useContext, memo} from 'react'
import style from '../stylesheets/navigation.module.css'
import logoutIcon from '../assets/logout.svg'
import { Link } from 'react-router-dom'
import userIcon from '../assets/user.svg'
import useUtils from '../hooks/useUtils'
const Navigation = memo(function Navigation() {

    const { setIsLoggedIn, user } = useContext(UserContext)
    const { imageHandler }  = useUtils()

    
    function logoutHandler() {
        Cookie.remove("token")
        setIsLoggedIn(false)
    }

    
    return (
        <nav className={style.desktop}>
            <h1 style={{
                display: 'none'
            }}>Navigation</h1>
            <ul className={style.navlist}>
                <li className={style.navitem} >
                    <Link className={style.link} to="/profile" 
                         >
                        Go to my profile
                    </Link>
                    <img 
                    className={style.img}
                    src={user ? imageHandler(user.image) : userIcon} 
                    alt="My profile image"/>
                    <h2>{user?.username}</h2>
                </li>        
                <li className={style.navitem} >
                    <Link className={style.link} to="/chats"
                         >
                        Go to my chats
                    </Link>
                    My chats
                </li>
                <li className={style.navitem} >
                    <Link className={style.link} to="/users"
                         >
                            Start a new chat
                    </Link>
                    New chat
                </li>
                
                <li className={style.navitem} >
                    <button className={style.button}
                        onClick={logoutHandler}>
                        <img className={style.icon} src={logoutIcon} alt='logout icon'/>
                        Log out
                    </button>
                </li>
            </ul>
        </nav>
    )
})

export default Navigation