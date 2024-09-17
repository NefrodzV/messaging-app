import { Outlet, useLocation, useParams } from 'react-router-dom';
import ChatList from './ChatList';
import useMediaQuery from '../hooks/useMediaQuery';
import SocketProvider from '../providers/SocketProvider';
export default function ChatAndProfileLayout() {
    const { chatId } = useParams();
    const { queryIsActive } = useMediaQuery('(max-width:768px)');
    const { pathname } = useLocation();
    return (
        <SocketProvider>
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
        </SocketProvider>
    );
}
