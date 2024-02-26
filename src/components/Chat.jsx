
import chatStyle from '../stylesheets/chat.module.css'
export default function Chat() {
    return (
        <li className={chatStyle.chat}>
            <div className={chatStyle.date}>09/Jan/2024</div>
            <div className={chatStyle.message}>Epso Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis accusamus maiores unde corporis provident exercitationem maxime dolorem. Error velit, odit a numquam nisi ab rerum, architecto aliquam, reiciendis inventore molestiae.</div>
        </li>
    )
}