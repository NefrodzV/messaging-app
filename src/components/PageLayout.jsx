import { Outlet, useParams, useNavigate, useLocation } from 'react-router-dom';
import Header from './Header';
import useMediaQuery from '../hooks/useMediaQuery';
import style from '../stylesheets/PageLayout.module.css';
import { useEffect } from 'react';
export default function PageLayout() {
    const { queryIsActive } = useMediaQuery('(max-width:768px)');
    const { chatId } = useParams();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    useEffect(() => {
        if (!pathname.includes('chats')) return;
        if (!queryIsActive && !chatId) {
            navigate('/chats/lastChat');
        }
    }, [queryIsActive, pathname]);
    return (
        <div className={style.layout}>
            <Header />
            <main className={style.main}>
                <Outlet />
            </main>
        </div>
    );
}
