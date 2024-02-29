import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useMutation, useQuery  } from '@tanstack/react-query'
import chatStyle from '../stylesheets/chat.module.css'
import { useContext, useEffect } from 'react'
import {UserContext} from '../contexts/UserContext'
import MessageCard from './MessageCard'
export default function Chat() {

    const params = useParams()
    const { token } = useContext(UserContext)
    const [ messages, setMessages ] = useState([])

    const { data, status, refetch } = useQuery({
        queryKey:['messages'],
        queryFn: async () => {
            const response = await fetch(
               `http://localhost:3000/api/messages?chatId=${params.id}`, {
                headers: {
                    'authorization': "Bearer " + token
                }
            })
            return response.json()
        }
    })

    useEffect(() => {
        if(status === "success") {
            setMessages(data.messages)
        }

        // TODO: Maybe do an loading animation here if status is pending
    },[status,data])


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

    return(
        <div className={chatStyle.chat}>
            <h2><span>Messages with</span> User</h2>
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
     )
}