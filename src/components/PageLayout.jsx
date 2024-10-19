import {
    Outlet,
    useParams,
    useNavigate,
    useLocation,
    Navigate,
} from 'react-router-dom';
import Header from './Header';
import useMediaQuery from '../hooks/useMediaQuery.js';
import style from '../stylesheets/PageLayout.module.css';
import { useEffect } from 'react';
import useUser from '../hooks/useUser';
import SocketProvider from '../providers/SocketProvider';
export default function PageLayout() {
    const { user } = useUser();
    const { queryIsActive } = useMediaQuery('(max-width:768px)');
    const { chatId } = useParams();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    useEffect(() => {
        if (pathname == '/' || pathname.includes('chats')) {
            if (!queryIsActive && !chatId) {
                if (user?.lastChat) navigate('chats/' + user?.lastChat);
            }
        }
    }, [queryIsActive, pathname]);
    return (
        <SocketProvider>
            <div className={style.layout}>
                <Header />
                <main className={style.main}>
                    <Outlet />
                </main>
            </div>
        </SocketProvider>
    );
}
