import { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import style from '../stylesheets/HomePage.module.css';
import Navigation from '../components/Navigation';
import ChatList from '../components/ChatList';
import { socket } from '../socket';

export default function HomePage() {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [fooEvents, setFooEvents] = useState([]);
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

    useEffect(() => {
        // no-op if the socket is already connected
        socket.connect();

        return () => {
            socket.disconnect();
        };
    }, []);
    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
            console.log('connected to socket');
        }

        function onDisconnect() {
            setIsConnected(false);
            console.log('disconnected from socket');
        }

        function onFooEvent(value) {
            setFooEvents((previous) => setFooEvents([previous, value]));
            console.log('An event has happened with this value');
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('foo', onFooEvent);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('foo', onFooEvent);
        };
    });
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
