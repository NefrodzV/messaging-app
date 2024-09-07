import style from '../stylesheets/Header.module.css';
import Navigation from './Navigation';
export default function Header() {
    return (
        <header className={style.header}>
            <div>Logo</div>
            <Navigation />
        </header>
    );
}
