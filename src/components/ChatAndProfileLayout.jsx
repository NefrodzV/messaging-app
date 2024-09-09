import { Outlet } from 'react-router-dom';
import ChatList from './ChatList';

export default function ChatAndProfileLayout() {
    return (
        <>
            <ChatList />
            <Outlet />
        </>
    );
}
