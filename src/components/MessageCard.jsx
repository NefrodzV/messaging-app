import style from '../stylesheets/messagecard.module.css'
export default function MessageCard({ message }) {
    function formatDate(data) {
        const msgDate = new Date(data)
        const today = new Date()
        const isSameDay = msgDate.toDateString() === today.toDateString()
        const formattedTime = msgDate.toLocaleTimeString('en-us', {
            hour: '2-digit',
            minute: '2-digit'
        })
        if(isSameDay) {
            return "today at "+ formattedTime
        } 
        const formattedDate =  msgDate.toLocaleDateString('en-Us')
        return formattedDate + " " + formattedTime
    }
    return (
        <li className={style.card}>
            {/*If you implement profile pics for group chats you need a 
            condition to show it */}
            {/* <img className={style.pic} src={icon}/>  */}
            <div>
                <h3>{formatDate(message.date)}</h3>
                <p>{message.text}</p>
            </div>
        </li>
    )

}