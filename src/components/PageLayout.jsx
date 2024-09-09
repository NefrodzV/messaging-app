import { Outlet } from 'react-router-dom';
import Header from './Header';
import useMediaQuery from '../hooks/useMediaQuery';
import style from '../stylesheets/PageLayout.module.css';
export default function PageLayout() {
    const { queryIsActive } = useMediaQuery('(max-width: 768px)');
    return (
        <div className={style.layout}>
            <Header />
            <main className={style.main}>
                <Outlet />
            </main>
        </div>
    );
}
