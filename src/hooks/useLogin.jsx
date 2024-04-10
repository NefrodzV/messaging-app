import { useContext, useState } from "react"
import { UserContext } from "../contexts/UserContext.jsx"
import Cookies from "js-cookie"


export default function useLogin() {

    const { setToken } = useContext(UserContext)
    const [ errors, setErrors ] = useState({})
    const [ status, setStatus ] = useState(null)

    async function login(data) {
        try {
            setStatus('pending')
            const request = await fetch(
                "https://messaging-api.adaptable.app/api/session/login",
                {
                    method: "POST",
                    headers: { "Content-Type" : "application/json" },
                    body: JSON.stringify(data),
                    mode: 'cors',
                    credentials: 'same-origin'
                }
            )

            const response = await request.json()

            // Handle request errors
            if(!request.ok) {
                setErrors(() => response.errors)
                setStatus('error')
                return
            }

            Cookies.set('token', response.token , { expires: 1 })
            setToken(response.token)
            setErrors({})
            setStatus('success')
            
        } catch(e) {
            console.log("Something happened when login: " + e)
            setStatus('error')
        }
    }
    return { login, errors, status }
}