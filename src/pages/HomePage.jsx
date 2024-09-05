import { useEffect, useState } from 'react';
import { useNavigate, Outlet, useParams, useLocation } from 'react-router-dom';
import style from '../stylesheets/HomePage.module.css';
import Navigation from '../components/Navigation';
import ChatList from '../components/ChatList';
import SocketProvider from '../providers/SocketProvider';
import useMediaQuery from '../hooks/useMediaQuery';

export default function HomePage() {
    const navigate = useNavigate();
    let { chatId } = useParams();
    const { queryIsActive } = useMediaQuery('(max-width:768px)');

    useEffect(() => {
        if (!queryIsActive && !chatId) {
            navigate('/chats/lastChat');
        }
    }, [queryIsActive]);

    return (
        <SocketProvider>
            <div className={style.page}>
                <header className={style.header}>
                    <div>Logo</div>
                    <Navigation />
                </header>
                <main className={style.main}>
                    {!queryIsActive ? <ChatList /> : !chatId && <ChatList />}
                    {chatId && <Outlet />}
                </main>
            </div>
        </SocketProvider>
    );
}
