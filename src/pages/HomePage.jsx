import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useUserContext from "../hooks/useUserContext"


export default function HomePage() {

    const { token } = useUserContext()
    
    const navigate = useNavigate()
    
    useEffect(() => {
        if(!token) {
            navigate('/login')
        }
    },[token])


    return <div>Homepage</div>
}