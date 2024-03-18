import Cookie from 'js-cookie'
import { UserContext } from '../contexts/UserContext'
import { useContext, useEffect, useRef, useState } from 'react'
import style from '../stylesheets/navigation.module.css'
import logoutIcon from '../assets/logout.svg'
import hamburgerIcon from '../assets/hamburger.svg'
import { Link } from 'react-router-dom'
import userIcon from '../assets/user.svg'
import useUser from '../hooks/useUser'
export default function Navigation({isMobileNavigation}) {

    const [isOpen, setOpen] = useState(false)

    const { setIsLoggedIn } = useContext(UserContext)
    const { user, loading } = useUser()

    function logoutHandler() {
        Cookie.remove("token")
        setIsLoggedIn(false)
    }

    function imageHandler(image) {
        const url = `data:${image.mimeType};base64,${image.data}`
        return url
    }

    function toggleHandler(e) {
        if(isOpen) {
            setOpen(false)
        } else {
            setOpen(true)
        }
    }

    
    return (
        <nav className={isMobileNavigation ? style.mobile : style.primary}>
                
                <button className={style.toggle} onClick={toggleHandler}>
                    <img className={style.icon} src={hamburgerIcon}  alt='menu icon'/>
                    <span style={{
                        display: "none"
                    }}>Open menu</span>
                </button>

                <h1 style={{
                    display: 'none'
                }}>Navigation</h1>
                <ul className={style.navlist} open={isOpen}>
                    <li className={style.navitem} >
                        <Link className={style.link} to="/profile">
                            Go to my profile
                        </Link>
                        <img 
                        className={style.img}
                        src={user.image ? imageHandler(user.image) : userIcon} 
                        alt="My profile image"/>
                        <h2>{user?.username}</h2>
                    </li>        
                    <li className={style.navitem} >
                        <Link className={style.link}to="/chats">Go to my chats</Link>
                        My chats
                    </li>
                    <li className={style.navitem} >
                        <Link className={style.link} to="/users">Start a new chat</Link>
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
}