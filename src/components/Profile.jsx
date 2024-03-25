import { useContext, useState } from 'react'
import userIcon from '../assets/user.svg'
import PasswordForm from './PasswordForm'
import ImageForm from './ImageForm'
import { UserContext } from '../contexts/UserContext'
export default function Profile() {
    const { user } = useContext(UserContext)
    const [show, setShow] = useState(null)

    function imageHandler(image) {
        const url = `data:${image.mimeType};base64,${image.data}`
        return url
    }

    function showHandler(id) {
        setShow(id)
    }

    function closeHander() {
        setShow(null)
    }
    return(
        <>
            {
                // If for some reason user is null show loading screen
                user ? 
                <div>
                    <h3>My profile</h3>
                    {/* Remove this later */}
                    <img style={{
                        width: '200px',
                        height: '200px'
                    }}
                        src={user ? imageHandler(user.image) : userIcon} 
                        alt="My profile image" />
                    <h3>{user?.username}</h3>
                    <button 
                    onClick={() => showHandler("password")}>
                        Change password</button>
                    <button onClick={() => showHandler("image")}>Change profile image</button>
                    <PasswordForm  show={show} close={closeHander}/>
                    <ImageForm show={show} close={closeHander} />
                </div>
                : <div>Loading...</div>
            }
        </>
    )
}