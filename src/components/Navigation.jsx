import Cookie from 'js-cookie'
import { UserContext } from '../contexts/UserContext'
import { useContext } from 'react'
import styles from '../stylesheets/navigation.module.css'
import logoutIcon from '../assets/logout.svg'
export default function Navigation() {

    const { setIsLoggedIn } = useContext(UserContext)
    
    function logoutHandler() {
        Cookie.remove("token")
        setIsLoggedIn(false)
    }
    return (
        <nav>
                <ul className={styles.navlist}>
                    <li className={styles.navitem}>
                        <button className={styles.button}
                            onClick={logoutHandler}>
                            <img className={styles.icon} src={logoutIcon}/>
                            Log out
                        </button>
                    </li>
                </ul>
        </nav>
    )
}