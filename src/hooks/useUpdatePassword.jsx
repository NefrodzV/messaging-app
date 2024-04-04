import { useContext, useState } from "react";
import { UserContext } from '../contexts/UserContext'
export default function useUpdatePassword() {

    const { token } = useContext(UserContext)
    const [status, setStatus] = useState("")
    const [errors , setErrors] = useState({})

    async function updatePassword(e) {
        try {
            setStatus("pending")
            const response = await fetch(
                "https://messaging-api.adaptable.app/api/users/me/password",
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": "Bearer " + token
                    },
                    mode:'cors',
                    body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
                }
            )
            
            const data = await response.json()

            if(!response.ok) {
                setStatus("error")
                setErrors(data.errors)
                return
            }
            setErrors({})
            setStatus("success")
        } catch(e) {
            console.log(e)
            setStatus("error")
        }
        
    }

    function reset() {
        setStatus(null)
    }
    

    return { status, errors, updatePassword, reset }
}