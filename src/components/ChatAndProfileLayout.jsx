import { Outlet, useLocation, useParams } from 'react-router-dom';
import ChatList from './ChatList';
import useMediaQuery from '../hooks/useMediaQuery.js';
import SocketProvider from '../providers/SocketProvider';
export default function ChatAndProfileLayout() {
    const { chatId } = useParams();
    const { queryIsActive } = useMediaQuery('(max-width:1024px)');
    const { pathname } = useLocation();
    return (
        <>
            {/** Only show the chatlist if query is not active. If the query
             * is active and the pathname is /chats only show chatlist if there
             * chat id
             */}
            {!queryIsActive ? (
                <ChatList />
            ) : (
                pathname.includes('/chats') && !chatId && <ChatList />
            )}
            {queryIsActive && pathname === '/chats' ? null : <Outlet />}
        </>
    );
}
