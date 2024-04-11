import ChatCard from "./ChatCard";
import style from '../stylesheets/chatlist.module.css'
import { useContext, useEffect, useState, memo } from "react";
import { UserContext } from '../contexts/UserContext'
import Loader from "./Loader";
const ChatList =  memo(function ChatList() {

    const { token } = useContext(UserContext)
    const [ chats, setChats ] = useState([])
    const [ loading , setLoading ] = useState(true)
    const [ error, setError] = useState(null)

    useEffect(() => {
        async function getChats() {
            try {
                const response = await fetch('https://messaging-api.adaptable.app/api/chats',
                    {
                        headers: {
                            'authorization': "Bearer "+ token
                        },
                        mode: 'cors',
                        credentials: 'same-origin'
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

    function loadData() {
        if(chats.length === 0) {
            return (
            <div className={style.wrapper}>
                <h2>You have no chats started</h2>
            </div>)
        }

        return chats?.map(chat => <ChatCard key={chat._id} chat={chat} />)
    }

    return (
        <>
            <h1 className="bg-secondary">Chats</h1>
            <ul className={style.list}>
                {
                    loading ? <Loader /> : loadData()
                }
            </ul>
        </>
        
    )
})
export default ChatList