import Cookie from 'js-cookie';
import { UserContext } from '../contexts/UserContext';
import { useContext, memo } from 'react';
import style from '../stylesheets/Navigation.module.css';
import logoutIcon from '../assets/svgs/logout.svg';
import xMarkSvg from '../assets/svgs/xmark.svg';
import { Link, NavLink } from 'react-router-dom';
import useUtils from '../hooks/useUtils';
import useSessionStorage from '../hooks/useSessionStorage';
const Navigation = memo(function Navigation() {
    const { setIsLoggedIn, user } = useContext(UserContext);
    const { imageHandler } = useUtils();
    const { removeSavedLocation } = useSessionStorage();

    function logoutHandler() {
        Cookie.remove('token');
        removeSavedLocation();
        setIsLoggedIn(false);
    }

    return (
        <nav className={style.navList}>
            <div className={style.logo}>Logo</div>
            <button
                type="button"
                className={style.close}
                aria-label="Close menu button"
                aria-expanded={false}
            >
                <img className={'icon'} src={xMarkSvg} alt="" />
            </button>
            <NavLink className={style.navLink}>
                <div className={style.content}>
                    <svg
                        className={style.navIcon}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                    >
                        <path
                            fill="currentColor"
                            d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"
                        />
                    </svg>
                    <span className={style.text}>Home</span>
                </div>
            </NavLink>
            <NavLink data-current={true} className={style.navLink}>
                <div className={style.content}>
                    <svg
                        className={style.navIcon}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                    >
                        <path
                            fill="currentColor"
                            d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
                        />
                    </svg>
                    <span className={style.text}>Profile</span>
                </div>
            </NavLink>
            <NavLink className={style.navLink}>
                <div className={style.content}>
                    <svg
                        className={style.navIcon}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 512"
                    >
                        <path
                            fill="currentColor"
                            d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192l42.7 0c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0L21.3 320C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7l42.7 0C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3l-213.3 0zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352l117.3 0C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7l-330.7 0c-14.7 0-26.7-11.9-26.7-26.7z"
                        />
                    </svg>
                    <span className={style.text}>Users</span>
                </div>
            </NavLink>
        </nav>
    );
});

export default Navigation;
