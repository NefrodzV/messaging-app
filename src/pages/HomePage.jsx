import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../contexts/UserContext"
import Header from "../components/Header"
import homeStyle from '../stylesheets/homepage.module.css'
import ChatList from "../components/ChatList"

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
    })
    
    return (
        <>
            { loading ? <h1>Loading...</h1> : 
                <div className={homeStyle.wrapper}>
                    <Header />
                    <main>
                        <aside>
                            My side bar
                        </aside>
                        <ChatList />
                    </main>
                </div> 
            }
        </>
    )
}