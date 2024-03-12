import { UserContext } from "../contexts/UserContext"
import { useContext, useEffect, useState } from "react"
// Returns a specific chat with id
export default function useChat(id) {

    const { token } = useContext(UserContext)
    const [data, setData] = useState(null)
    const [status, setStatus] = useState('pending')
    // This is not in use right now  but in the future it might
    // const [errors, setErrors] = useState({})


    useEffect(() => {
        getChat()
    },[])

    async function getChat() {
        try {
            
            const response = await fetch(
                'http://localhost:3000/api/chats/'+id,{
                    headers: {
                        "authorization": "Bearer " + token,
                        
                    }
                }
            )
    
            const json = await response.json()
            if(!response.ok) {
                setStatus('error')
                // setErrors(data.errors)
                console.log(data.errors)
                return
            }
            setStatus("success")
            setData(json)
        } catch(e) {
            setStatus('error')
            throw new Error("Error fetching chat data: " + e)
        }
    }
    return { data, status }
}