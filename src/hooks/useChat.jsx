import { UserContext } from "../contexts/UserContext"
import { useContext, useEffect, useState } from "react"
// Returns a specific chat with id
export default function useChat(id) {

    const { token } = useContext(UserContext)
    const [chat, setChat] = useState(null)
    const [status, setStatus] = useState('loading')
    const [errors, setErrors] = useState({})


    useEffect(() => {
        getChat()
    },[])

    async function getChat() {
        try {
            const response = await fetch(
                'http://localhost:3000/api/chat/'+id,{
                    headers: {
                        "authorization": "Bearer " + token,
                        'content-type': "application/json"
                    }
                }
            )
    
            const data = await response.json()
            if(!response.ok) {
                setStatus('error')
                setErrors(data.errors)
                throw new Error("Something went wrong getting chat")
            }
            setStatus("success")
            setChat(data.chat)
        } catch(e) {
            setStatus('error')
            throw new Error("Error fetching chat data: " + e)
        }
    }
    return { chat, status, errors }
}