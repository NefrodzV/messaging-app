import style from '../stylesheets/MessageItem.module.css';
import userSvg from '../assets/svgs/user.svg';
import { useUser } from '../hooks';
import { formatDate } from '../utils/utils.js';
export default function MessageItem({ message, onClick }) {
    const auth = useUser();
    const { _id, user, text, date, imgs, mine } = message;

    function messageIsFromAuthUser() {
        return auth.user.username == user.username;
    }
    return (
        <article
            className={style.message}
            data-reverse={messageIsFromAuthUser()}
        >
            <div
                className={style.bubble}
                onClick={onClick.bind('message', message)}
            >
                <p className={style.text}>{text}</p>
                <span className={style.time}>{formatDate(new Date(date))}</span>
            </div>
            <img
                className={style.userImage}
                src={user?.image || userSvg}
                alt={`${user?.username} profile image`}
            />
        </article>
    );
}
