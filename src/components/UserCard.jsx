import PropTypes from 'prop-types';
import style from '../stylesheets/usercard.module.css';
import { Link } from 'react-router-dom';
import userIcon from '../assets/svgs/user.svg';
import useUtils from '../hooks/useUtils';
export default function UserCard({ user }) {
    const { imageHandler } = useUtils();
    return (
        <div className={style.card}>
            <Link
                className={style.link}
                to={'/chats/create'}
                state={{ user: user }}
            >
                chat
            </Link>
            <img
                className={style.profile}
                src={
                    user?.profile?.image
                        ? imageHandler(user?.profile?.image)
                        : userIcon
                }
            />
            <p className={style.text}>{user?.profile?.username}</p>
        </div>
    );
}
UserCard.propTypes = {
    user: PropTypes.object,
};
