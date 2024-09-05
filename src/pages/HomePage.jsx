import { useEffect, useState } from 'react';
import { useNavigate, Outlet, useParams, useLocation } from 'react-router-dom';
import style from '../stylesheets/HomePage.module.css';
import Navigation from '../components/Navigation';
import ChatList from '../components/ChatList';
import SocketProvider from '../providers/SocketProvider';

export default function HomePage() {
    const navigate = useNavigate();
    let { chatId } = useParams();
    const [isMobile, setIsMobile] = useState(
        window.matchMedia('(max-width: 768px)').matches
    );

    useEffect(() => {
        const onResizeHandler = () => {
            setIsMobile(window.matchMedia('(max-width: 768px)').matches);
        };

        onResizeHandler();
        window.addEventListener('resize', onResizeHandler);

        return () => {
            window.removeEventListener('resize', onResizeHandler);
        };
    }, []);

    useEffect(() => {
        if (!isMobile && !chatId) {
            navigate('/chats/lastChat');
        }
    }, [isMobile]);

    return (
        <SocketProvider>
            <div className={style.page}>
                <header className={style.header}>
                    <div>Logo</div>
                    <Navigation />
                </header>
                <main className={style.main}>
                    {!isMobile ? <ChatList /> : !chatId && <ChatList />}
                    {chatId && <Outlet />}
                </main>
            </div>
        </SocketProvider>
    );
}
