import { useContext, useEffect, useState } from "react"
import { useNavigate , Outlet } from "react-router-dom"
import { UserContext } from "../contexts/UserContext"
import Header from "../components/Header"
import homeStyle from '../stylesheets/homepage.module.css'
import Navigation from "../components/Navigation"
import useDimen from "../hooks/useDimen"
export default function HomePage() {

    const [ loading, setLoading ] = useState(true)
    const { isLoggedIn } = useContext(UserContext)
    
    const navigate = useNavigate()

    const { deviceType } = useDimen()

    useEffect(() => {
        if(!isLoggedIn) {
            navigate('/login')
            return
        }
        setLoading(false)
    },[isLoggedIn])

    return (
        <>
            { loading ? <h1>Loading...</h1> : 
                <div className={homeStyle.wrapper}>
                    <Header />
                    <main>
                        { deviceType === 'desktop' ? <Navigation /> : false }
                        <Outlet />
                    </main>
                </div> 
            }
        </>
    )
}