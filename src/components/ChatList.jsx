import style from '../stylesheets/ChatList.module.css';
import { useState } from 'react';
import ChatItem from '../components/ChatItem';
import UserList from './UserList';
export default function ChatList() {
    const [isUserListDialogOpen, setIsUserListDialogOpen] = useState(false);
    const openDialogHandler = () => {
        setIsUserListDialogOpen(!isUserListDialogOpen);
    };
    return (
        <section className={style.chatList} aria-label="Chats">
            <header className={style.header}>
                <h1>Chats</h1>
                <button
                    className={`${style.add}`}
                    aria-label="Start new chat"
                    title="Start new chat button"
                    type="button"
                    onClick={openDialogHandler}
                >
                    <svg
                        className="icon"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                    >
                        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
                    </svg>
                </button>
            </header>
            <div className={style.container}>
                <ChatItem delayAnim={'.2s'}></ChatItem>
                <ChatItem delayAnim={'.4s'}></ChatItem>
                <ChatItem delayAnim={'.8s'}></ChatItem>
                <ChatItem delayAnim={'1.2s'}></ChatItem>
                <ChatItem delayAnim={'1.6s'}></ChatItem>
                <ChatItem delayAnim={'2s'}></ChatItem>
                <ChatItem delayAnim={'2.4s'}></ChatItem>
                <ChatItem delayAnim={'2.8s'}></ChatItem>
                <ChatItem delayAnim={'3.2s'}></ChatItem>
                <ChatItem delayAnim={'3.6s'}></ChatItem>
            </div>

            <UserList
                isOpen={isUserListDialogOpen}
                onClose={openDialogHandler}
            />
        </section>
    );
}
