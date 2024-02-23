import { useState } from "react";

export default function  useSignup() {

    const [errors, setErrors] = useState({})
    const [success, setSuccess] = useState(false)

    async function signup(data) {
        try {
            const request = await fetch(
            'http://localhost:3000/api/session/register',
            {
                method: 'POST',
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(data),
                mode: 'cors'
                
            })

            const response = await request.json()
            
            if(!request.ok) {
                setErrors(response.errors)
                return
            }
            setSuccess(true)
            setErrors({})

        } catch(e) {
            console.log("Something went with signup" + e)
        } 
    }
    return { signup, setSuccess, success, errors }
}