import style from '../stylesheets/ChatList.module.css';
import { useContext, useEffect, useRef, useState } from 'react';
import ChatItem from '../components/ChatItem';
import useUser from '../hooks/useUser.js';
import { SocketContext } from '../providers/SocketProvider';
import CenteredWrapper from './CenteredWrapper';
import { Link } from 'react-router-dom';
export default function ChatList() {
    const { user, setUser } = useUser();
    const { chats } = user;

    const { socket } = useContext(SocketContext);

    useEffect(() => {
        const lastMessageUpdate = (message) => {
            const copy = structuredClone(user);
            copy.chats.map((chat) => {
                if (chat._id === message.chatId) {
                    chat.lastMessage = message;
                    return chat;
                }

                return chat;
            });

            setUser(copy);
        };

        socket?.on('lastMessage', lastMessageUpdate);

        return () => {
            socket?.off('lastMessage', lastMessageUpdate);
        };
    }, []);
    return (
        <section className={style.chatList} aria-label="Chats">
            <header className={style.header}>
                <h1>Your chats</h1>
                <Link
                    className={`${style.add}`}
                    aria-label="Go start a new chat"
                    title="Start a new chat"
                    to={'/users'}
                >
                    <svg
                        className="icon"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                    >
                        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
                    </svg>
                </Link>
            </header>
            <div className={style.container}>
                {chats.length != 0 ? (
                    chats?.map((chatItem, i) => (
                        <ChatItem
                            key={chatItem._id}
                            chat={chatItem}
                            delayAnim={`${i * 0.2}s`}
                        />
                    ))
                ) : (
                    <CenteredWrapper text={'No chats started by you'} />
                )}
            </div>
        </section>
    );
}
