import { useParams, useSearchParams } from "react-router-dom"
import chatStyle from '../stylesheets/chat.module.css'
import { useQuery } from "@tanstack/react-query"
import { useContext, useState, useEffect } from "react"
import { UserContext } from "../contexts/UserContext"

export default function Chat() {
    // Todo Refresh when a chat has been created
    // When chat has been created redirect to chat with chat/:id
    const { token } = useContext(UserContext)

    const [queryParams, setQueryParams] = useSearchParams()

    const [ chatId, setChatId ] = useState(null)

    const [messages, setMessages] = useState([])

    const { data, status, refetch } = useQuery({
        queryKey:['messages'],
        queryFn: async () => {
            const response = await fetch(
               `http://localhost:3000/api/messages?chatId=${chatId}`, {
                headers: {
                    'authorization': "Bearer " + token
                }
            })
            return response.json()
        }
    })

    async function sendMessage(message) {
        const body = {
            userId: queryParams.get("userId"),
            message: message
        }
        console.log(JSON.stringify(body))
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
        console.log("Successfully sent a message")
        console.log(data)
    }

    useEffect(() => {
        if(status === 'success'){
            setMessages(data.messages)
        }
        console.log(data)
    },[status])

    function sendMessageHandler(e) {
        e.preventDefault()
        setChatId("65de4e980bd11fb500ab5333")
        console.log('running send messages handler')
        // const message = e.target["message"].value
        // sendMessage(message)
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