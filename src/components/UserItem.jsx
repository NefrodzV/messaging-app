import PropTypes from 'prop-types';
import style from '../stylesheets/UserItem.module.css';
import userSvg from '../assets/svgs/user.svg';
import useStartChat from '../hooks/useStartChat';
export default function UserItem({ user }) {
    const { _id, username, image } = user;
    const { startChat } = useStartChat();
    return (
        <article className={style.user}>
            <img src={image || userSvg} alt={`${username} profile image`} />
            <span className={style.username}>{username}</span>
            <button
                title={`Start chat with ${user?.username}`}
                aria-label={`Start chat with ${user?.username}`}
                onClick={startChat.bind('userId', _id)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path
                        fill="currentColor"
                        d="M64 0C28.7 0 0 28.7 0 64L0 352c0 35.3 28.7 64 64 64l96 0 0 80c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L309.3 416 448 416c35.3 0 64-28.7 64-64l0-288c0-35.3-28.7-64-64-64L64 0z"
                    />
                </svg>
            </button>
        </article>
    );
}
UserItem.propTypes = {
    user: PropTypes.object,
};
