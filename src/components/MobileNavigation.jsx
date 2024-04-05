import { useState, useContext } from "react"
import { Link } from "react-router-dom"
import hamburgerIcon from '../assets/hamburger.svg'
import userIcon from '../assets/user.svg'
import { UserContext } from "../contexts/UserContext"
import logoutIcon from '../assets/logout.svg'
import useUtils from "../hooks/useUtils"
import Cookie from 'js-cookie'
import style from '../stylesheets/navigation.module.css'

export default function MobileNavigation() {
    const [isOpen, setOpen] = useState(false)
    const { setIsLoggedIn, user } = useContext(UserContext)
    const { imageHandler }  = useUtils()

    function logoutHandler() {
        Cookie.remove("token")
        setIsLoggedIn(false)
    }
    function toggleHandler() {
        if(isOpen) {
            setOpen(false)
        } else {
            setOpen(true)
        }
    }
    return (
        <nav className={style.mobile}>
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
                        <Link className={style.link} to="/profile" 
                            onClick={toggleHandler} >
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
                            onClick={toggleHandler} >
                            Go to my chats
                        </Link>
                        My chats
                    </li>
                    <li className={style.navitem} >
                        <Link className={style.link} to="/users"
                            onClick={toggleHandler} >
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
}