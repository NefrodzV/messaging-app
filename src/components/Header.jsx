import useDimen from '../hooks/useDimen'
import headerStyles from '../stylesheets/header.module.css'
import Navigation from './Navigation'
export default function Header() {

    const { deviceType } = useDimen()

    return(
        <header className={headerStyles.wrapper}>
            { deviceType === 'mobile' ? <Navigation /> : null }
            <span>Logo</span>
        </header>
    )
}