import { useEffect, useState } from 'react';
import style from '../stylesheets/ChatItem.module.css';
import userSvg from '../assets/svgs/user.svg';

export default function ChatItem({
    text,
    user,
    imgUrl,
    time,
    delayAnim,
    clickHandler,
}) {
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
                    onClick={clickHandler}
                    className={style.chatItem}
                    data-show={show}
                    style={{ animationDelay: delayAnim }}
                >
                    <div className={style.message}>
                        <header>
                            <div className={style.username}>
                                {user || 'Rose Vargas Hernandez'}
                            </div>
                            <span className={style.time}>
                                {time || '8:12pm'}
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
                    <img
                        className={style.user}
                        src={imgUrl || userSvg}
                        alt="user profile image"
                    />
                </article>
            )}
        </>
    );
}
