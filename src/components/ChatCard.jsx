import { Link } from 'react-router-dom'
import userIcon from '../assets/user.svg'
import style from '../stylesheets/chatcard.module.css'
import { memo } from 'react'
const ChatCard = memo( function ChatCard({ chat }) {
    // The user that's chatting with the logged in user
    const user = chat.users[0]
    function imageHandler(image) {
        const url = `data:${image.mimeType};base64,${image.data}`
        return url
    }

    function formatDate(data) {
        const msgDate = new Date(data)
        const today = new Date()
        const isSameDay = msgDate.toDateString() === today.toDateString()
        const formattedTime = msgDate.toLocaleTimeString('en-us', {
            hour: '2-digit',
            minute: '2-digit'
        })
        if(isSameDay) {
            return "today at " +  formattedTime
        } 
        const formattedDate =  msgDate.toLocaleDateString('en-Us')
        return formattedDate + " " + formattedTime
    }
    return (
        <li className={style.chat}> 
            <Link className={style.link} to={`/chats/${chat._id}`}>
                Go to chat with user
            </Link>
            <img 
                className={style.image}
                src={user.profile.image ? 
                imageHandler(user.profile.image) : userIcon} 
                alt='User profile image I am chatting with'/>
            <div className={style.content}>
                <p className={style.user}>
                    {user.profile.username} 
                    <span className={style.date}>{formatDate(chat.lastMessage.date)}</span>
                </p>
                <p className={ style.message }>{chat.lastMessage.text}</p>
            </div>
            
        </li>
    )
})
export default ChatCard