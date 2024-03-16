import headerStyles from '../stylesheets/header.module.css'
import Navigation from './Navigation'
export default function Header() {
    return(
        <header className={headerStyles.wrapper}>
            <Navigation isMobileNavigation={true} />
            <span>Logo</span>
           {/* <Navigation /> */}
        </header>
    )
}