import ChatCard from "./ChatCard";
import chatListStyle from '../stylesheets/chatlist.module.css'
import { useContext, useEffect, useState, memo } from "react";
import { UserContext } from '../contexts/UserContext'
import Loader from "./Loader";
const ChatList =  memo(function ChatList() {

    const { token } = useContext(UserContext)
    const [ chats, setChats ] = useState(null)
    const [ loading , setLoading ] = useState(true)
    const [ error, setError] = useState(null)

    useEffect(() => {
        async function getChats() {
            try {
                const response = await fetch('http://localhost:3000/api/chats',
                    {
                        headers: {
                            'authorization': "Bearer "+ token
                        }
                    }
                ) 
                const json = await response.json()
                if(!response.ok) {
                    setError(json.errors)
                    return
                }
                setChats(json.chats)
            } catch(e) {
                setError('Some error happened fetching the data ' + e) 
            } finally {
                setLoading(false)
            }
        }
        if(!token) return
        getChats()
    },[token])

    return (
        <>
            <h1 className="bg-secondary">Chats</h1>
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