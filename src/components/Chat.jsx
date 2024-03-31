import { useParams, useLocation } from 'react-router-dom'
import chatStyle from '../stylesheets/chat.module.css'
import { useContext, useState, useEffect } from 'react'
import {UserContext} from '../contexts/UserContext'
import MessageCard from './MessageCard'
import ChatHeader from './ChatHeader'
import useChat from '../hooks/useChat'
import Loader from './Loader'
import Input from './Input'
export default function Chat() {

    const { state } = useLocation()
    const { id } = useParams()
    const { token } = useContext(UserContext)
    const [user, setUser] = useState(null)
    const { data, loading, error, update, create } = useChat(id, user)
    const [messages, setMessages] = useState([])
    const [sentMessage, setSentMessage] =  useState(null)
    // const [sentMessageIsLoading, setSentMessageIsLoading] = useState(false)
    // data of the response of the message sent
    // errors of the response when sending the message
    // const [sentMessageError, setSentMessageError] = useState(null)
    // State from a location changed example /chats/create
    useEffect(() =>{
        if(!state) return
        setUser({...state.user})
    },[state])
    
    useEffect(() => {
        if(!data) return
        setMessages([ ...data.messages ])
        // If the user is not defined the set it
        if(!user) setUser({...data.user })
        console.log('data is')
        console.log(data)
    },[data])

    // useEffect(() => {
    //     if(!id) return
    //     update()
    // },[id,sentMessage, update])

    // Sends message to api
    async function sendMessage(message) {
        try {
            // setSentMessageIsLoading(true)
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
                // setSentMessageError(json.errors)
                return
            }
            setSentMessage(json)
        } catch(e) {
            // setSentMessageError("Some error happened sending message:" + e)
        } finally {
            // setSentMessageIsLoading(false)
        }
    }

    function sendMessageHandler(e) {
        e.preventDefault()
        const message = e.target["message"].value
        if(!message.trim()) {
            return
        }
        /** If there is id param send a message if not 
         * create a chat with a message sent*/
        if(!id) {
            create(message)
        } else {
            sendMessage(message)
            update()
        }
        e.target.reset()
    }

    if(error) return <div>Whoops something went wrong</div>
    return(
        <div className={chatStyle.chat}>
            <ChatHeader 
                username={user?.profile?.username}
                image={user?.profile?.image}/>
            { loading ? <Loader /> :  
                <>
                    <ul className={chatStyle.messagelist}>     
                    {
                        messages.map((message) => 
                            <MessageCard 
                                key={message._id} 
                                message={message} 
                                mine={message.myself} />) 
                    }
                    </ul>
                    <form noValidate={true} onSubmit={sendMessageHandler}>
                        <div className={chatStyle.control}>
                            <Input 
                                type={'text'}
                                name={'message'}
                                id={'message'}
                                placeholder={
                                    `Message ${user?.profile?.username}`}/>
                            <button>send</button>
                        </div>
                    </form>
                </>
            }
        </div>  
    )
}