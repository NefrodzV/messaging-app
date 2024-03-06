import { useContext, useState } from "react";
import { UserContext } from '../contexts/UserContext'
export default function useUpdatePassword() {

    const { token } = useContext(UserContext)
    const [status, setStatus] = useState("")
    const [errors , setErrors] = useState({})

    async function updatePassword(e) {
        try {
            setStatus("Pending")
            const response = await fetch(
                "http://localhost:3000/api/users/me/password",
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": "Bearer " + token
                    },
                    body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
                }
            )
            
            const data = await response.json()

            if(!response.ok) {
        
                setStatus("error")
                setErrors(data.errors)
                return
            }
            setStatus("success")
        } catch(e) {
            console.log(e)
            setStatus("error")
        }
        
    }

    return { status, errors, updatePassword }
}