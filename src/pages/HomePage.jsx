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
    const [isDesktop, setIsDesktop] = useState(null);

    const openHandler = () => {
        console.log('Opening menu');
        setMenuIsOpen(!menuIsOpen);
    };

    useEffect(() => {
        const onResizeHandler = () => {
            const viewportWidth = window.innerWidth;
            if (viewportWidth >= 1024 && !isDesktop) {
                setIsDesktop(true);
            }

            if (viewportWidth <= 768 && isDesktop) {
                setIsDesktop(false);
            }
        };

        onResizeHandler();
        window.addEventListener('resize', onResizeHandler);

        return () => {
            window.removeEventListener('resize', onResizeHandler);
        };
    });

    return (
        <div className={style.page}>
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
