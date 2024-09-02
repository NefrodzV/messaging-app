import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import style from '../stylesheets/HomePage.module.css';
import Navigation from '../components/Navigation';
import hamburgerSvg from '../assets/svgs/hamburger.svg';
import ChatList from '../components/ChatList';
import Chat from '../components/Chat';

export default function HomePage() {
    const [isDesktop, setIsDesktop] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const onResizeHandler = () => {
            const viewportWidth = window.innerWidth;
            if (viewportWidth > 768) {
                setIsDesktop(true);
            }

            if (viewportWidth <= 768) {
                setIsDesktop(false);
            }
        };

        onResizeHandler();
        window.addEventListener('resize', onResizeHandler);

        return () => {
            window.removeEventListener('resize', onResizeHandler);
        };
    }, []);

    useEffect(() => {
        // Navigate to page with a chat id
        if (isDesktop) {
            navigate('/chats/1111');
        } else {
            navigate('/chats');
        }
    }, [isDesktop]);
    return (
        <div className={style.page}>
            <header className={style.header}>
                <div>Logo</div>
                <Navigation />
            </header>
            <main className={style.main}>
                <ChatList />
                <Outlet />
            </main>
        </div>
    );
}
