import { useEffect, useState } from 'react';
import style from '../stylesheets/ChatItem.module.css';
import userSvg from '../assets/svgs/user.svg';
import { Link } from 'react-router-dom';
import { isToday, isYesterday } from '../utils/utils';
export default function ChatItem({ chat, delayAnim }) {
    const { lastMessage, _id, user, date } = chat;
    const [mounted, setMounted] = useState(false);
    const [show, setShow] = useState(false);
    useEffect(() => {
        setMounted(true);
        setShow(true);
    }, []);
    function formatDate(date) {
        const options = { hour: 'numeric', minute: 'numeric' };
        if (isToday(date)) {
            return date.toLocaleString(undefined, options);
        } else if (isYesterday(date)) {
            return 'Yesterday';
        } else {
            return date.toLocaleDateString();
        }
    }

    return (
        <>
            {mounted && (
                <article
                    className={style.chatItem}
                    data-show={show}
                    style={{ animationDelay: delayAnim }}
                >
                    <div className={style.message}>
                        <header>
                            <div className={style.username}>
                                {user?.username || 'Rose Vargas Hernandez'}
                            </div>
                            {lastMessage != undefined && lastMessage?.date && (
                                <span className={style.time}>
                                    {formatDate(new Date(lastMessage?.date))}
                                </span>
                            )}
                        </header>
                        {lastMessage != undefined && lastMessage?.text && (
                            <p>{lastMessage?.text}</p>
                        )}
                    </div>
                    <Link
                        to={'/chats/' + _id}
                        aria-label={`Open your chat with ${user?.username}`}
                    ></Link>
                    <img
                        className={style.user}
                        src={user?.image?.w150 || userSvg}
                        alt={`${user?.username} profile image`}
                    />
                </article>
            )}
        </>
    );
}
