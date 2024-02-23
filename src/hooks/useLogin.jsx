import { useContext, useEffect, useState } from "react"
import { UserContext } from "../contexts/UserContext.jsx"
import { useNavigate } from "react-router-dom"

export default function useLogin() {

    const navigate = useNavigate()

    const { updateToken, token } = useContext(UserContext)
    const [errors, setErrors] = useState({})

    useEffect(() => {
        // When token has changed navigate to home
        if(token) {
            navigate('/')
        }
    },[token, navigate])

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

            // Update the user token and reset errors to empty object
            updateToken(response.token)
            setErrors({})

        } catch(e) {
            console.log("Something happened when login: " + e)
        }
    }
    return [login, errors]
}