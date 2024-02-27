import PropTypes from 'prop-types'
import style from '../stylesheets/usercard.module.css'
import exampleImg from '../assets/logout.svg'
export default function UserCard({ user }) {
    return (
        <div className={style.card} data-id={user._id}>
            <img className={style.profile} src={exampleImg} />
            <p className={style.text}>{user.profile.username}</p>
            <button className={style.button}>chat</button>
        </div>
    )
}
UserCard.propTypes = {
    user: PropTypes.object
}