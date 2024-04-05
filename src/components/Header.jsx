import headerStyles from '../stylesheets/header.module.css'
import MobileNavigation from './MobileNavigation'
export default function Header() {

    return(
        <header className={headerStyles.wrapper}>
            <MobileNavigation />
            <span className='logo-secondary'>MSGR</span>
        </header>
    )
}