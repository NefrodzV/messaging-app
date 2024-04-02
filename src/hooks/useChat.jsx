import { useNavigate } from "react-router-dom"
import { UserContext } from "../contexts/UserContext"
import { useCallback, useContext, useEffect, useState } from "react"
// Returns a specific chat with id
export default function useChat(id, user) {

    const navigate = useNavigate()
    const { token } = useContext(UserContext)
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    // This is not in use right now  but in the future it might
    const [error, setError] = useState(null)
    const getChatHandler = useCallback(getChat, [id, token])
    const updateHandler = useCallback(update,[getChatHandler])
    const existenceHandler = useCallback(checkChatExistence,[user,navigate,token])
    const createHandler = useCallback(createChat,[navigate, user, token])
    useEffect(() => {
        // No need to get this if data was return for checking with user id
        if(data) return
        if(!id) return
        getChatHandler()
    },[id, data, getChatHandler])

    // For checking chat existence
    useEffect(() => {
        // If the chat is already identified return no need to check
        if(id) return
        if(!user) return
        existenceHandler()
    },[id,user, existenceHandler])

    async function getChat() {
        try {
            const response = await fetch(
                'https://messaging-api.adaptable.app/api/chats/'+ id,{
                    headers: {
                        "authorization": "Bearer " + token,
                    }
                }
            )
    
            const json = await response.json()
            if(!response.ok) {
                // setStatus('error')
                // setErrors(data.errors)
                console.log(json.errors)
                return
            }
            setData(json)
        } catch(e) {
            setError("Error getting chat data: " + e)
            throw new Error("Error fetching chat data: " + e)
        } finally  {
            setLoading(false)
        }
    }

    function update() {
        getChatHandler()
    }

    async function checkChatExistence() {
        try {
            const response = await fetch(
            `https://messaging-api.adaptable.app/api/chats?userId=${user._id}`,
            {
                headers: {
                    "authorization": "Bearer " + token
                }
            })

            const data = await response.json()

            if(!response.ok) {
                setLoading(false)
                // If there inst an already made chat get the selected user with id
                return
            }
            navigate('/chats/' + data.chat._id, {replace: true})
        } catch(e) {
            setError('Some error happened' + e)
            throw new Error("Something went wrong checking chat existence: " + e)
        }
    }
    async function createChat(message) {
        const body = {
            userId:user._id,
            message: message
        }
        const response = await fetch('https://messaging-api.adaptable.app/api/chats',{
            method: 'POST',
            headers:{
                "authorization": "Bearer " + token,
                "content-type": "application/json"
            },
            body: JSON.stringify(body)
        })

        const json = await response.json()

        if(!response.ok) {
            throw new Error('Something went wrong with sending message...')
        }

        setData(json)

        // Redirect to chat component
        navigate('/chats/' + json.chatId)
    }

    // TODO: Implement a reload function here
    return { data, loading, error, update: updateHandler, create: createHandler }
}