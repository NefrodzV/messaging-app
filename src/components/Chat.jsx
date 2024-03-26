import { useParams } from 'react-router-dom'
import chatStyle from '../stylesheets/chat.module.css'
import { useContext, useState, useEffect } from 'react'
import {UserContext} from '../contexts/UserContext'
import MessageCard from './MessageCard'
import ChatHeader from './ChatHeader'
import useChat from '../hooks/useChat'
import Loader from './Loader'

export default function Chat() {

    const { id } = useParams()
    const { token } = useContext(UserContext)
    const { data, loading, error, update } = useChat(id)
    // TODO: MOVE ALL LOGIC FOR SENDING A MESSAGE TO ITS OWN CUSTOM HOOK
    // loading state when sending a message
    const [sentMessageIsLoading, setSentMessageIsLoading] = useState(false)
    // data of the response of the message sent
    const [sentMessage, setSentMessage] =  useState(null)
    // errors of the response when sending the message
    const [sentMessageError, setSentMessageError] = useState(null)

    useEffect(() => {
        update()
    },[sentMessage, update])

    // Sends message to api
    async function sendMessage(message) {
        try {
            setSentMessageIsLoading(true)
            const body = {
                message: message
            }
            const response = await fetch(
                `http://localhost:3000/api/messages?chatId=${id}`,
                {
                    method: "POST",
                    headers:{
                        "authorization": "Bearer " + token,
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(body)
                }
            )
            const json = await response.json()
            if(!response.ok) {
                setSentMessageError(json.errors)
                return
            }
            setSentMessage(json)
        } catch(e) {
            setSentMessageError("Some error happened sending message:" + e)
        } finally {
            setSentMessageIsLoading(false)
        }
    }

    function sendMessageHandler(e) {
        e.preventDefault()
        const message = e.target["message"].value
        if(!message.trim()) {
            return
        }
        sendMessage(message)
        e.target.reset()
    }

    if(error) return <div>Whoops something went wrong</div>
    
    return(
        <div className={chatStyle.chat}>
            <ChatHeader user={data?.chat?.users[0]} />
            { loading ? <Loader /> :  
                <>
                    <ul className={chatStyle.messagelist}>     
                    {
                        data?.messages?.map((message) => 
                            <MessageCard key={message._id} message={message} />)
                    }
                    </ul>
                    <form noValidate={true} onSubmit={sendMessageHandler}>
                        <div className={chatStyle.control}>
                            <input type="text" name="message" id="message" />
                            <button>send</button>
                        </div>
                    </form>
                </>
            }
        </div>  
    )
}