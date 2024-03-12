import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useMutation, useQuery  } from '@tanstack/react-query'
import chatStyle from '../stylesheets/chat.module.css'
import { useContext, useEffect } from 'react'
import {UserContext} from '../contexts/UserContext'
import MessageCard from './MessageCard'
import ChatHeader from './ChatHeader'
import useChat from '../hooks/useChat'
export default function Chat() {

    const params = useParams()

    const { token } = useContext(UserContext)
    const { data, status } = useChat(params.id)
    const [ messages, setMessages ] = useState([])
    const [loading, setLoading] = useState(true)
    const [otherUser, setOtherUser] = useState(null)

    // Gets messages from api
    // const { data, status, refetch } = useQuery({
    //     queryKey:['messages'],
    //     queryFn: async () => {
    //         const response = await fetch(
    //            `http://localhost:3000/api/messages?chatId=${params.id}`, {
    //             headers: {
    //                 'authorization': "Bearer " + token
    //             }
    //         })
    //         return response.json()
    //     }
    // })

    useEffect(() => {
        if(status === "pending") {
            setLoading(true)
            return
        }
        if(status === "success") { 
            console.log("data in use effect")
            console.log(data)
            setLoading(false)
            setMessages(data.messages)
            setOtherUser(data.chat.users[0])
           
        }
    },[status,data])


    // Sends message to api
    const messageMutation = useMutation({
        mutationFn: sendMessage,
        onSettled: (data, error, variables, context)  => {
            refetch()
        }
    })

    function sendMessage(message) {
        const body = {
            message: message
        }
        return fetch(
            `http://localhost:3000/api/messages?chatId=${params.id}`,
            {
                method: "POST",
                headers:{
                    "authorization": "Bearer " + token,
                    "content-type": "application/json"
                },
                body: JSON.stringify(body)
            }
        )
    }

    function sendMessageHandler(e) {
        e.preventDefault()
        const message = e.target["message"].value
        if(!message.trim()) {
            return
        } 
        messageMutation.mutate(message)
        e.target.reset()
    }

    

    console.log(params.id)
    return(
        <>
            {
                loading ? <div>Loading...</div> :
                <div className={chatStyle.chat}>
                    <ChatHeader user={otherUser} />
                    <ul className={chatStyle.messagelist}>     
                    {
                        messages?.map((message) => 
                            <MessageCard key={message._id} message={message} />)
                    }
                    </ul>
                    <form noValidate={true} onSubmit={sendMessageHandler}>
                        <div className={chatStyle.control}>
                            <input type="text" name="message" id="message" />
                            <button>send</button>
                        </div>
                    </form>
                </div>
            }
        </>
        
    )
}