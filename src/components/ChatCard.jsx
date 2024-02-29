import { Link } from 'react-router-dom'
import style from '../stylesheets/chatcard.module.css'
export default function ChatCard({ chat }) {
    return (
        <li className={style.chat}> 
            <Link className={style.link} to={`/chat/${chat._id}`}>
                Go to chat with user
            </Link>
            <h3 className={ style.date }>{chat.lastMessage.date}</h3>
            <h4 className={ style.message }>{chat.lastMessage.text}</h4>
           
        </li>
    )
}
