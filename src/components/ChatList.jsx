import ChatCard from './ChatCard';
import style from '../stylesheets/ChatList.module.css';
import { useContext, useEffect, useState, memo } from 'react';
import { UserContext } from '../contexts/UserContext';
import Loader from './Loader';
import ChatItem from '../components/ChatItem';
export default function ChatList({ render, clickHandler }) {
    const [isMounted, setIsMounted] = useState(null);
    const [show, setShow] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        console.log('render chatList' + render);
        console.log(render);
        if (render) {
            setIsMounted(true);
            setShow(true);
            setIsClosing(false);
            return;
        }
        if (!render && show) setIsClosing(true);
    }, [render]);

    return (
        <>
            {isMounted && (
                <section
                    id="chatList"
                    data-show={show}
                    data-closing={isClosing}
                    className={style.chatList}
                    aria-label="Chats"
                    onAnimationEnd={(e) => {
                        if (isClosing && show) {
                            setShow(false);
                            setIsMounted(false);
                        }
                    }}
                >
                    <ChatItem
                        clickHandler={clickHandler}
                        delayAnim={'.2s'}
                    ></ChatItem>
                    <ChatItem delayAnim={'.4s'}></ChatItem>
                    <ChatItem delayAnim={'.8s'}></ChatItem>
                    <ChatItem delayAnim={'1.2s'}></ChatItem>
                    <ChatItem delayAnim={'1.6s'}></ChatItem>
                    <ChatItem delayAnim={'2s'}></ChatItem>
                    <ChatItem delayAnim={'2.4s'}></ChatItem>
                    <ChatItem delayAnim={'2.8s'}></ChatItem>
                    <ChatItem delayAnim={'3.2s'}></ChatItem>
                    <ChatItem delayAnim={'3.6s'}></ChatItem>
                </section>
            )}
        </>
    );
}
