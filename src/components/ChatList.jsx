import ChatCard from './ChatCard';
import style from '../stylesheets/ChatList.module.css';
import { useContext, useEffect, useState, memo } from 'react';
import { UserContext } from '../contexts/UserContext';
import Loader from './Loader';
import ChatItem from '../components/ChatItem';
const ChatList = memo(function ChatList() {
    // const { token } = useContext(UserContext);
    // const [chats, setChats] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);

    // useEffect(() => {
    //     async function getChats() {
    //         try {
    //             const response = await fetch(
    //                 'https://messaging-api.adaptable.app/api/chats',
    //                 {
    //                     headers: {
    //                         authorization: 'Bearer ' + token,
    //                     },
    //                     mode: 'cors',
    //                     credentials: 'same-origin',
    //                 }
    //             );
    //             const json = await response.json();
    //             if (!response.ok) {
    //                 setError(json.errors);
    //                 return;
    //             }
    //             setChats(json.chats);
    //         } catch (e) {
    //             setError('Some error happened fetching the data ' + e);
    //         } finally {
    //             setLoading(false);
    //         }
    //     }
    //     if (!token) return;
    //     getChats();
    // }, [token]);

    //     function loadData() {
    //         if (chats.length === 0) {
    //             return (
    //                 <div className={style.wrapper}>
    //                     <h2>You have no chats started</h2>
    //                 </div>
    //             );
    //         }
    //
    //         return chats?.map((chat) => <ChatCard key={chat._id} chat={chat} />);
    //     }

    return (
        <section className={style.chatList} aria-label="Chats">
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
        </section>
    );
});
export default ChatList;
