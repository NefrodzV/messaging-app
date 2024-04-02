import PropTypes from 'prop-types'
import style from '../stylesheets/usercard.module.css'
import { Link } from 'react-router-dom'
import userIcon from '../assets/user.svg'
import { Buffer } from 'buffer'
export default function UserCard({ user }) {
    
    function imageHandler(image) {
        const buff = Buffer.from(image.binData.data)
        const url = `data:${image.mimeType};base64,${buff.toString('base64')}`
        return url
    }
    return (
        <div className={style.card}>
            <Link className={style.link}to={'/chats/create'} state={{user: user}} >chat</Link>
            <img className={style.profile} 
                src={
                    user?.profile?.image ? imageHandler(user?.profile.image) :
                    userIcon
                } />
            <p className={style.text}>{user?.profile?.username}</p>
            
            {/* <Link to={`/chat?userId=${user._id}&username=${user?.profile?.username}`}>Chat</Link> */}
        </div>
    )
}
UserCard.propTypes = {
    user: PropTypes.object
}