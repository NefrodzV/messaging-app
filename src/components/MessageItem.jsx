import style from '../stylesheets/MessageItem.module.css';
import userSvg from '../assets/svgs/user.svg';
export default function MessageItem({ message, onClick }) {
    const { _id, user, text, date, imgs } = message;

    return (
        <article className={style.message}>
            <div
                className={style.bubble}
                onClick={onClick.bind('message', message)}
            >
                <p className={style.text}>{text}</p>
                <span className={style.time}>8:12 am</span>
            </div>
            <img
                className={style.userImage}
                src={user.imageUrl || userSvg}
                alt={`${user?.username} profile image`}
            />
        </article>
    );
}
