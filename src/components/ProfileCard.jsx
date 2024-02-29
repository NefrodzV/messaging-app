import { Link } from "react-router-dom"
import style from '../stylesheets/profilecard.module.css'
import userIcon from "../assets/user.svg"
export default function ProfileCard() {

    
    return (
        <div className={style.card}>
            <Link className={style.link} to="/profile">Go to my profile</Link>
            <img className={style.img}src={userIcon} alt="My profile image"/>
            <h3>Username</h3>
        </div>
    )
}