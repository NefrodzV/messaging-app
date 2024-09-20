import { useEffect, useState } from 'react';
import style from '../stylesheets/ChatItem.module.css';
import userSvg from '../assets/svgs/user.svg';
import { Link } from 'react-router-dom';

export default function ChatItem({ chat, delayAnim }) {
    const { text, _id, user, date } = chat;
    const [mounted, setMounted] = useState(false);
    const [show, setShow] = useState(false);
    useEffect(() => {
        setMounted(true);
        setShow(true);
    }, []);

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
                            <span className={style.time}>
                                {date || '8:12pm'}
                            </span>
                        </header>
                        <p>
                            {text ||
                                `Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Blanditiis laborum similique nesciunt, explicabo saepe
                    laboriosam minus eveniet est delectus minima sit odit eos
                    fugiat, repellendus eum dicta illo cumque! Est!`}
                        </p>
                    </div>
                    <Link
                        to={'/chats/' + _id}
                        aria-label={`Open your chat with ${user?.username}`}
                    ></Link>
                    <img
                        className={style.user}
                        src={user?.image || userSvg}
                        alt={`${user?.username} profile image`}
                    />
                </article>
            )}
        </>
    );
}
