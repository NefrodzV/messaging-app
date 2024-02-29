import { Link } from 'react-router-dom'
import style from '../stylesheets/chatcard.module.css'
export default function ChatCard({ chat }) {
    return (
        <li className={style.chat}>
            <h3 className={ style.date }>{chat.lastMessage.date}</h3>
            <h4 className={ style.message }>{chat.lastMessage.text}</h4>
            <Link to={`/chat/${chat._id}`}>Go to chat with</Link>
        </li>
    )
}
