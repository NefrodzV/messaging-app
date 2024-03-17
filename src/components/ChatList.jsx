import ChatCard from "./ChatCard";
import chatListStyle from '../stylesheets/chatlist.module.css'
import { useContext, useEffect, useState } from "react";
import { UserContext } from '../contexts/UserContext'
import { useQuery } from "@tanstack/react-query";
export default function ChatList() {

    const { token } = useContext(UserContext)
    const [ chats, setChats ] = useState([])
    const [loading , setLoading] = useState(true)
    const { data, status } = useQuery({
        queryKey: ["chats"],
        queryFn: async () => {
            const response = await fetch(
                'http://localhost:3000/api/chats',
                {
                    headers: {
                        'authorization': "Bearer "+ token
                    }
                }
            )  

            return await response.json()
        }
    })

    useEffect(() => {
        if(status === "success") {
            setChats(data.chats)
            setLoading(false)
        }

    },[data, status])
    return (
        <>
            <h1>Chats</h1>
            <ul className={chatListStyle.list}>
                {
                    loading ? 
                    <div>Loading...</div> :
                    chats?.map(chat => <ChatCard key={chat._id} chat={chat} />)
                }
            </ul>
        </>
        
    )
}