import { useEffect, useState } from 'react';
import { useNavigate, Outlet, useParams } from 'react-router-dom';
import style from '../stylesheets/HomePage.module.css';
import ChatList from '../components/ChatList';
import Header from '../components/Header';
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
                <Header />
                <main className={style.main}>
                    {!queryIsActive ? <ChatList /> : !chatId && <ChatList />}
                    {chatId && <Outlet />}
                </main>
            </div>
        </SocketProvider>
    );
}
