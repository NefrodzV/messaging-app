import { useState } from "react";

export default function  useSignup() {

    const [errors, setErrors] = useState({})
    const [status, setStatus] = useState(null)

    async function signup(data) {
        try {
            setStatus('pending')
            const request = await fetch(
            'https://messaging-api.adaptable.app/api/session/register',
            {
                method: 'POST',
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(data),
                mode: 'cors',
                credentials: 'same-origin'

                
            })

            const response = await request.json()
            
            if(!request.ok) {
                setErrors(response.errors)
                setStatus('error')
                return
            }
            setStatus('success')
            setErrors({})

        } catch(e) {
            setStatus('error')
            console.log("Something went with signup" + e)
        } 
    }

    function reset() {
        setStatus(null)
    }
    return { signup, reset, status, errors }
}