import { Link } from 'react-router-dom';
import userIcon from '../assets/svgs/user.svg';
import style from '../stylesheets/chatcard.module.css';
import { memo } from 'react';
import useUtils from '../hooks/useUtils';
const ChatCard = memo(function ChatCard({ chat }) {
    // The user that's chatting with the logged in user
    const user = chat.users[0];
    const { imageHandler } = useUtils();

    function formatDate(data) {
        const msgDate = new Date(data);
        const today = new Date();
        const isSameDay = msgDate.toDateString() === today.toDateString();
        const formattedTime = msgDate.toLocaleTimeString('en-us', {
            hour: '2-digit',
            minute: '2-digit',
        });
        if (isSameDay) {
            return 'today at ' + formattedTime;
        }
        const formattedDate = msgDate.toLocaleDateString('en-Us');
        return formattedDate + ' ' + formattedTime;
    }
    return (
        <li className={style.chat}>
            <Link className={style.link} to={`/chats/${chat._id}`}>
                Go to chat with user
            </Link>
            <img
                className={style.image}
                src={imageHandler(user?.profile?.image)}
                alt="User profile image I am chatting with"
            />
            <div className={style.content}>
                <p className={style.user}>
                    {user.profile.username}
                    <span className={style.date}>
                        {formatDate(chat.lastMessage.date)}
                    </span>
                </p>
                <p className={style.message}>{chat.lastMessage.text}</p>
            </div>
        </li>
    );
});
export default ChatCard;
