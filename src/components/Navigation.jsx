import Cookie from 'js-cookie';
import { UserContext } from '../providers/UserProvider';
import { useContext, memo } from 'react';
import style from '../stylesheets/Navigation.module.css';
import logoutIcon from '../assets/svgs/logout.svg';
import xMarkSvg from '../assets/svgs/xmark.svg';
import { Link, NavLink, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import useMediaQuery from '../hooks/useMediaQuery';
export default function Navigation() {
    const { queryIsActive } = useMediaQuery('(max-width: 1024px)');
    const { chatId } = useParams();
    const handleNavLinkActive = ({ isActive, isPending, isTransitioning }) => {
        return isActive ? `${style.navLink} ${style.active}` : style.navLink;
    };
    return (
        <nav className={style.navList}>
            <div className={style.logo}>Logo</div>
            {queryIsActive && (
                <NavLink
                    className={handleNavLinkActive}
                    title="Go to my chats"
                    aria-label="Go to my chats"
                    to={'chats'}
                >
                    <div className={style.content}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                        >
                            <path
                                fill="currentColor"
                                d="M64 0C28.7 0 0 28.7 0 64L0 352c0 35.3 28.7 64 64 64l96 0 0 80c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L309.3 416 448 416c35.3 0 64-28.7 64-64l0-288c0-35.3-28.7-64-64-64L64 0z"
                            />
                        </svg>

                        <span className={style.text}>Chats</span>
                    </div>
                </NavLink>
            )}
            <NavLink
                className={handleNavLinkActive}
                title="Go to my profile"
                aria-label="Go to my profile"
                to={'profile'}
            >
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
            {/* <NavLink
                className={style.navLink}
                title="Go to users page"
                aria-label="Go to users page"
            >
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
            </NavLink> */}
            {/* <button
                type="button"
                aria-label="View chats"
                className={style.navLink}
                id={style.chatsButton}
                title="View chats button"
                onClick={clickHandler}
            >
                <div className={style.content}>
                    <svg
                        className={style.navIcon}
                        viewBox="0 0 8 8"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill="currentColor"
                            d="m0 0v5l1-1h1v-3h3v-1zm3 2v4h4l1 1v-5z"
                        />
                    </svg>
                    <span className={style.text}>Chats</span>
                </div>
            </button> */}
        </nav>
    );
}
Navigation.propTypes = {
    isOpen: propTypes.bool,
    openHandler: propTypes.func,
};
