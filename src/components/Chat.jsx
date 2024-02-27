import { useParams, useSearchParams } from "react-router-dom"
import chatStyle from '../stylesheets/chat.module.css'
import { useQuery } from "@tanstack/react-query"
import { useContext } from "react"
import { UserContext } from "../contexts/UserContext"

export default function Chat() {
    const { token } = useContext(UserContext)
    const [queryParams] = useSearchParams()

    async function sendMessage(message) {
        const body = {
            userId: queryParams.get("userId"),
            message: message
        }
        const response = fetch('http://localhost:3000/api/chat',{
            headers:{
                "authorization": "Bearer " + token
            },
            body: JSON.stringify(body)
        })

        const data = await response.json()

        if(!response.ok) {
            
            throw new Error('Something went wrong with sending message...')
        }
        console.log("Successfully sent a message")
        console.log(data)
    }
    
    function sendMessageHandler(e) {
        e.preventDefault()
        const message = e.target["message"].value
        console.log(message)
        // sendMessage()
    }

    return(
       <div className={chatStyle.chat}>
            <ul className={chatStyle.messagelist}>
                <li>
                    My message
                </li>
            </ul>
            <form noValidate={true} onSubmit={sendMessageHandler}>
                <div className={chatStyle.control}>
                    <input type="text" name="message" id="message" />
                    <button>send</button>
                </div>
            </form>
       </div>
    )
}