import style from '../stylesheets/MessageItem.module.css';
import userSvg from '../assets/svgs/user.svg';
import { useUser } from '../hooks';
import { formatDate } from '../utils/utils.js';
import Image from './Image.jsx';
export default function MessageItem({ message, onClick }) {
    const auth = useUser();
    const { _id, user, text, date, images } = message;

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
                <div className={style.images}>
                    {images?.map((image) => (
                        <Image
                            className={style.image}
                            key={image.cloudinary_public_id}
                            url={image.url}
                        />
                    ))}
                </div>
            </div>
            <img
                className={style.userImage}
                src={user?.image.w56 || userSvg}
                alt={`${user?.username} profile image`}
            />
        </article>
    );
}
