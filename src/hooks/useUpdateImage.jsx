import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";

export default function useUpdateImage() {

    const { token } = useContext(UserContext)
    const [status, setStatus]  = useState()
    const [errors, setErrors] = useState(null)

    async function upload(e) {
        const image = e.target["image"].files[0]
        try {
            setStatus("pending")
            const formData = new FormData()
            formData.append("image", image)
            const response = await fetch(
                "http://localhost:3000/api/users/me/image",
                {
                    method: "PUT",
                    headers: {
                        "authorization": "Bearer " + token,
                    },
                    body: formData
                    
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
        } catch(e) {
            console.log(e)
            setStatus("error")
        }
    }
    return { status, errors, upload }
}
