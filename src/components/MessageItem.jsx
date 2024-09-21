import style from '../stylesheets/MessageItem.module.css';
import userSvg from '../assets/svgs/user.svg';
export default function MessageItem({ message, onClick }) {
    const { _id, user, text, date, imgs, mine } = message;
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString();
    }
    return (
        <article className={style.message} data-reverse={mine}>
            <div
                className={style.bubble}
                onClick={onClick.bind('message', message)}
            >
                <p className={style.text}>{text}</p>
                <span className={style.time}>{formatDate(date)}</span>
            </div>
            <img
                className={style.userImage}
                src={user?.image || userSvg}
                alt={`${user?.username} profile image`}
            />
        </article>
    );
}
