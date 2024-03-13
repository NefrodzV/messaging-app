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

    const { id } = useParams()
    
    const { token } = useContext(UserContext)
    const { data, loading, error } = useChat(id)
    
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

    if(loading) return <div>Loading...</div> 
    if(error) return <div>Whoops something went wrong</div>
    
    return(
        <div className={chatStyle.chat}>
            <ChatHeader user={data.chat.users[0]} />
            <ul className={chatStyle.messagelist}>     
            {
                data.messages?.map((message) => 
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