import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import style from '../stylesheets/HomePage.module.css';
import Navigation from '../components/Navigation';
import hamburgerSvg from '../assets/svgs/hamburger.svg';
import ChatList from '../components/ChatList';
import Chat from '../components/Chat';

export default function HomePage() {
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    // const [isMobile, setIsMobile] = useState(false);
    const pageRef = useRef(null);
    const openHandler = () => {
        console.log('Opening menu');
        setMenuIsOpen(!menuIsOpen);
    };
    // useEffect(() => {
    //     const page = pageRef?.current;
    //     const pageWidth = window
    //         .getComputedStyle(page, null)
    //         .getPropertyValue('width');
    //     /**  On render get the page width if the device
    //      * screen is lower than */
    //     if (parseInt(pageWidth) < 768) {
    //         setMenuIsOpen(false);
    //     }
    // }, []);

    return (
        <div ref={pageRef} className={style.page}>
            <header className={style.header}>
                <div>Logo</div>
                <Navigation openHandler={openHandler} isOpen={menuIsOpen} />
                <button
                    className={style.hamburger}
                    type="button"
                    aria-label="Open or Close menu"
                    aria-expanded={menuIsOpen}
                    onClick={openHandler}
                >
                    <img className="icon" src={hamburgerSvg} alt="Menu icon" />
                </button>
            </header>
            <main className={style.main}>
                <ChatList />
                <Chat />
            </main>
        </div>
    );
}
