import style from '../stylesheets/messagecard.module.css'
export default function MessageCard({ message }) {
    return (
        <li className={style.card}>
            {/* <img className={style.pic} src={icon}/>  */}
            <div>
                <h3>{message.date}</h3>
                <p>{message.text}</p>
            </div>
        </li>
    )

}