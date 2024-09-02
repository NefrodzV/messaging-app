import ChatCard from './ChatCard';
import style from '../stylesheets/ChatList.module.css';
import { useContext, useEffect, useState, memo } from 'react';
import Loader from './Loader';
import ChatItem from '../components/ChatItem';
export default function ChatList({ render, clickHandler }) {
    return (
        <section className={style.chatList} aria-label="Chats">
            <ChatItem clickHandler={clickHandler} delayAnim={'.2s'}></ChatItem>
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
    );
}
