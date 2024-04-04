import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";

export default function useUpdateImage() {

    const { token, updateUser } = useContext(UserContext)
    const [status, setStatus]  = useState()
    const [errors, setErrors] = useState(null)

    async function upload(e) {
        const image = e.target["image"].files[0]
        try {
            setStatus("pending")
            const formData = new FormData()
            formData.append("image", image)
            const response = await fetch(
                "https://messaging-api.adaptable.app/api/users/me/image",
                {
                    method: "PUT",
                    headers: {
                        "authorization": "Bearer " + token,
                    },
                    body: formData,
                    mode:'cors'
                    
                }
            )
            const data = await response.json()
            if(!response.ok){
                setErrors(data.errors)
                setStatus('error')
                return
            }

            setStatus("success")
            setErrors({})
            updateUser()
        } catch(e) {
            console.log(e)
            setStatus("error")
        }
    }

    function reset() {
        setStatus(null)
    }
    return { status, errors, upload, reset }
}
