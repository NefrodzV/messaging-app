import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import logout from '../assets/logout.svg'
import headerStyles from '../stylesheets/header.module.css'
import Cookie from 'js-cookie'
export default function Header() {
    
    const { setIsLoggedIn } = useContext(UserContext)
    function logoutHandler() {
        // removes the token from cookies
        Cookie.remove('token')
        setIsLoggedIn(false)
    }

    return(
        <header className={headerStyles.wrapper}>
            <span>Logo</span>
            <nav>
                <ul className={headerStyles.navlist}>
                    <li className={headerStyles.navitem}>
                        <button className={headerStyles.button}
                            onClick={logoutHandler}>
                            <img className={headerStyles.icon} src={logout}/>
                            Log out
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    )
}