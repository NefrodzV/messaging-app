import { useContext, useEffect, useState } from "react"
import { useNavigate , Outlet ,Link } from "react-router-dom"
import { UserContext } from "../contexts/UserContext"
import Header from "../components/Header"
import homeStyle from '../stylesheets/homepage.module.css'
import Navigation from "../components/Navigation"
export default function HomePage() {

    const [ loading, setLoading ] = useState(true)
    const { isLoggedIn } = useContext(UserContext)
    
    const navigate = useNavigate()

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
                        <Navigation isMobileNavigation={false}/>
                        {/* <aside>
                            
                            <ProfileCard />
                            <Link to="/users">Start chat</Link>
                            <Link to="/chats">Chats</Link>
                           
                        </aside> */}
                        <Outlet />
                    </main>
                </div> 
            }
        </>
    )
}