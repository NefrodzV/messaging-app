import { useContext, useState } from 'react'
import userIcon from '../assets/user.svg'
import PasswordForm from './PasswordForm'
import ImageForm from './ImageForm'
import { UserContext } from '../contexts/UserContext'
import style from '../stylesheets/profile.module.css'
import useUtils from '../hooks/useUtils'
import Loader from '../components/Loader'
export default function Profile() {
    const { user } = useContext(UserContext)
    const [show, setShow] = useState(null)
    const { imageHandler }  = useUtils()

    function showHandler(id) {
        setShow(id)
    }

    function closeHander() {
        setShow(null)
    }
    return(
        <div className={style.container} >
            {
                // If for some reason user is null show loading screen
                user ? 
                <>
                    <h1 className='bg-secondary'>My profile</h1>
                    {/* Remove this later */}
                    <div className={style.wrapper} >
                        <img className={style.img}
                            src={user ? imageHandler(user.image) : userIcon} 
                            alt="My profile image" />
                        <h2>{user?.username}</h2>
                        <button
                        className={`${style.button}`} 
                        onClick={() => showHandler("password")}>
                            Change password</button>
                        <button 
                        className={`${style.button} l-top-margin`} 
                        onClick={() => showHandler("image")}>Change image</button>
                        <PasswordForm show={show} close={closeHander}/>
                        <ImageForm show={show} close={closeHander} />
                    </div>
                </>
                : <Loader />
            }
        </div>
    )
}