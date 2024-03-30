
import userIcon from '../assets/user.svg'
import style from '../stylesheets/chat.module.css'

export default function ChatHeader({ username , image }) {

    function imageHandler(image) {
        const url = `data:${image.mimeType};base64,${image.data}`
        return url
    }
    
    return (
        <div className={`${style.header} bg-secondary`} >
            <img 
                src={
                    image ? imageHandler(image) : userIcon
                }
                alt="Image of user I am chatting with" />
            {username ? <h2>{username}</h2> :
                <>
                    <h2 style={{
                        backgroundColor: 'lightgray',
                        width:'25%',
                        height: '100%'
                    }}></h2>
                </>
            }
            
        </div>
    )
}