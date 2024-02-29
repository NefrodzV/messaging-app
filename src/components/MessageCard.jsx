import style from '../stylesheets/messagecard.module.css'
import icon from '../assets/user.svg'
export default function MessageCard({ message }) {
    return (
        <li className={style.message}>
            <img className={style.pic} src={icon}/> 
            <div>
                <h3>{message.date}</h3>
                <p>{message.text}</p>
            </div>
        </li>
    )

}