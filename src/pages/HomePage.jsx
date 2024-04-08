import { useContext, useEffect, useState } from "react"
import { useNavigate , Outlet, useLocation } from "react-router-dom"
import { UserContext } from "../contexts/UserContext"
import Header from "../components/Header"
import homeStyle from '../stylesheets/homepage.module.css'
import Navigation from "../components/Navigation"
import useDimen from "../hooks/useDimen"
import Loader from "../components/Loader"
import useSessionStorage from "../hooks/useSessionStorage"
export default function HomePage() {

    const [ loading, setLoading ] = useState(true)
    const { user, isLoggedIn } = useContext(UserContext)
    const { savedLocation } = useSessionStorage()
    const navigate = useNavigate()

    const { deviceType } = useDimen()

    useEffect(() => {
        if(!isLoggedIn) {
            navigate('/login')
            return
        } else {
            // Navigate to the last location the user was in
            if(savedLocation) {
                navigate(
                    savedLocation.pathname, { state: savedLocation.state})
            }
        }
    },[isLoggedIn])

    useEffect(() => {
        if(user) setLoading(false)
    },[user])

    return (
        <>
                <div className={homeStyle.wrapper}>
                    <Header />
                    {
                        loading ? <Loader /> : 
                        <main>
                            { deviceType === 'desktop' ? <Navigation /> : false }
                            <Outlet />
                        </main>
                    }
                </div> 
            
        </>
    )
}