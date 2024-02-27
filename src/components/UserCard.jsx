import PropTypes from 'prop-types'
import style from '../stylesheets/usercard.module.css'
import exampleImg from '../assets/logout.svg'
import { Link } from 'react-router-dom'
export default function UserCard({ user }) {
    return (
        <div className={style.card}>
            <img className={style.profile} src={exampleImg} />
            <p className={style.text}>{user.profile.username}</p>
            <Link to={`/chat?userId=${user._id}&username=${user.profile.username}`}>Chat</Link>
        </div>
    )
}
UserCard.propTypes = {
    user: PropTypes.object
}