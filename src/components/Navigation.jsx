import Cookie from 'js-cookie'
import { UserContext } from '../contexts/UserContext'
import { useContext,  useState, memo, useEffect } from 'react'
import style from '../stylesheets/navigation.module.css'
import logoutIcon from '../assets/logout.svg'
import hamburgerIcon from '../assets/hamburger.svg'
import { Link } from 'react-router-dom'
import useDimen from '../hooks/useDimen'
import userIcon from '../assets/user.svg'

const Navigation = memo(function Navigation() {

    const [isOpen, setOpen] = useState(false)

    const { deviceType } = useDimen() 

    const { setIsLoggedIn, user } = useContext(UserContext)

    // Making the state of mobile menu close when device width changes
    useEffect(() => {
        if(deviceType === 'desktop') {
            if(isOpen) setOpen(false)
        }
    },[deviceType])
    
    function logoutHandler() {
        Cookie.remove("token")
        setIsLoggedIn(false)
    }

    function imageHandler(image) {
        const url = `data:${image.mimeType};base64,${image.data}`
        return url
    }

    function toggleHandler(e) {
        //No need to run this code for desktops
        if(deviceType !== 'mobile') return
        if(isOpen) {
            setOpen(false)
        } else {
            setOpen(true)
        }
    }

    
    return (
        <nav>
                
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
})

export default Navigation