import { useNavigate, useSearchParams } from "react-router-dom"
import chatStyle from '../stylesheets/chat.module.css'
import { useContext, useEffect } from "react"
import { UserContext } from "../contexts/UserContext"

export default function CreateChat() {
    const { token } = useContext(UserContext)
    const navigate = useNavigate()

    const [params] = useSearchParams()

    async function createChat(message) {
        const body = {
            userId: params.get("userId"),
            message: message
        }
        const response = await fetch('http://localhost:3000/api/chats',{
            method: 'POST',
            headers:{
                "authorization": "Bearer " + token,
                "content-type": "application/json"
            },
            body: JSON.stringify(body)
        })

        const data = await response.json()

        if(!response.ok) {
            console.log(data.errors)
            throw new Error('Something went wrong with sending message...')
        }
    
        // Redirect to chat component
        navigate('/chat/' + data.chat.id)
    }

    // Checks chat existence between users and redirects if they do
    async function checkChatExistence() {
        const userId = params.get('userId')

        const response = await fetch(
            `http://localhost:3000/api/chats?userId=${userId}`,
            {
                headers: {
                    "authorization": "Bearer " + token
                }
            }
        )

        const data = await response.json()

        if(!response.ok) return
        console.log(data)
        navigate('/chat/' + data.chat._id)

    }
    useEffect(() => {
        checkChatExistence()
    })
    function createChatHandler(e) {
        e.preventDefault()
        const message = e.target["message"].value
        createChat(message)
    }

    return(
       <div className={chatStyle.chat}>
        <h2>Start chat with user</h2>
            <ul className={chatStyle.messagelist}>
                
            </ul>
            <form noValidate={true} onSubmit={createChatHandler}>
                <div className={chatStyle.control}>
                    <input type="text" name="message" id="message" 
                    placeholder="Send message to start a chat with this user..."/>
                    <button>send</button>
                </div>
            </form>
       </div>
    )
}