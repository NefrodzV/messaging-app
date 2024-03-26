import ChatCard from "./ChatCard";
import chatListStyle from '../stylesheets/chatlist.module.css'
import { useContext, useEffect, useState, memo } from "react";
import { UserContext } from '../contexts/UserContext'
import { useQuery } from "@tanstack/react-query";
import Loader from "./Loader";
const ChatList =  memo(function ChatList() {

    const { token } = useContext(UserContext)
    const [ chats, setChats ] = useState(null)
    const [ loading , setLoading ] = useState(true)
    // TODO: A bug occurred when because tokken is null when this runs
    const { data, status } = useQuery({
        queryKey: ["chats"],
        queryFn: async () => {
            console.log('token in chat list is')
            console.log(token)
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
        if(status === "success" && data.chats !== undefined) {
            console.log(data.chats)
            setChats(data.chats)
            setLoading(false)
        } else {
            setLoading(true)
        }

    },[data, status])
    return (
        <>
            <h1>Chats</h1>
            <ul className={chatListStyle.list}>
                {
                    loading ? 
                    <Loader /> :
                    chats?.map(chat => <ChatCard key={chat._id} chat={chat} />)
                }
            </ul>
        </>
        
    )
})
export default ChatList