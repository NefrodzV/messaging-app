import { Link } from "react-router-dom"
import style from '../stylesheets/profilecard.module.css'
import userIcon from "../assets/user.svg"
import useUser from "../hooks/useUser"
export default function ProfileCard() {

    const { user, loading } = useUser()
    
    function imageHandler(image) {
        const url = `data:${image.mimeType};base64,${image.data}`
        return url
    }
    
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