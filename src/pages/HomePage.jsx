import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../contexts/UserContext"
import Header from "../components/Header"

export default function HomePage() {

    const [ loading, setLoading] = useState(true)
    const { token } = useContext(UserContext)
    
    const navigate = useNavigate()

    useEffect(() => {
        if(!token) {
            navigate('/login')
            return
        }
        setLoading(false)
    })
    
    return (
        <>
            { loading ? <h1>Loading...</h1> : 
                <div className="wrapper">
                    <Header />
                </div> 
            }
        </>
    )
}