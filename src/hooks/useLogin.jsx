import { useContext, useState } from "react"
import { UserContext } from "../contexts/UserContext.jsx"
import Cookies from "js-cookie"


export default function useLogin() {

    const { setToken } = useContext(UserContext)

    const [ errors, setErrors ] = useState({})

    async function login(data) {
        try {
            const request = await fetch(
                "http://localhost:3000/api/session/login",
                {
                    method: "post",
                    headers: { "Content-Type" : "application/json" },
                    body: JSON.stringify(data)
                }
            )

            const response = await request.json()

            // Handle request errors
            if(!request.ok) {
                setErrors(() => response.errors)
                console.log(response)
                return
            }

            Cookies.set('token', response.token , { expires: 1 })
            setToken(response.token)
            setErrors({})
            
        } catch(e) {
            console.log("Something happened when login: " + e)
        }
    }
    return [login, errors]
}