import { useState, useEffect } from "react";

export default function  useSignup() {

    const [errors, setErrors] = useState(null)
    const [success, setSuccess] = useState(null)

    async function signup(data) {
        try {
            const request = await fetch(
            'http://localhost:3000/api/session/register',
            {
                method: 'post',
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(data)
            })

            const response = await request.json()
            if(!response.ok) {
                
                setErrors(response.errors)
            }
            setSuccess(true)

        } catch(e) {
            console.log("Something went with signup" + e)
        } finally {
            if(success) {
                setSuccess(false)
            }
        }
        
    }
    return [
        signup,
        success,
        errors,
    ]
}