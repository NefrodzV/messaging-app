import { Link } from "react-router-dom"
import style from '../stylesheets/profilecard.module.css'
import userIcon from "../assets/user.svg"
import useUser from "../hooks/useUser"
import useUtils from "../hooks/useUtils"
export default function ProfileCard() {

    const { user, loading } = useUser()
    const { imageHandler }  = useUtils()
    
    return (
        <>
            {
                loading ? <div>Loading...</div> : 
                <div className={style.card}>
                <Link className={style.link} to="/profile">Go to my profile</Link>
                <img 
                className={style.img}
                src={user.image ? imageHandler(user.image) : userIcon} 
                alt="My profile image"/>
                <h2>{user?.username}</h2>
                </div>
            }
        
        </>
        
    )
}