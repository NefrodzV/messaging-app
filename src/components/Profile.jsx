import { useState } from 'react'
import userIcon from '../assets/user.svg'
import useUser from '../hooks/useUser'
import PasswordForm from './PasswordForm'
import ImageForm from './ImageForm'
export default function Profile() {
    const { user , loading } = useUser()
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
                loading ? <div>Loading...</div> :
                <div>
                    <h3>My profile</h3>
                    {/* Remove this later */}
                    <img style={{
                        width: '200px',
                        height: '200px'
                    }}
                        src={user.image ? imageHandler(user.image) : userIcon} 
                        alt="My profile image" />
                    <h3>{user?.username}</h3>
                    <button 
                    onClick={() => showHandler("password")}>
                        Change password</button>
                    <button onClick={() => showHandler("image")}>Change profile image</button>
                    <PasswordForm  show={show} close={closeHander}/>
                    <ImageForm show={show} close={closeHander} />
                </div>
            }
        </>
    )
}