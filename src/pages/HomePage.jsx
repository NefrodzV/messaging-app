import { useContext, useEffect, useState } from "react"
import { useNavigate , Outlet ,Link } from "react-router-dom"
import { UserContext } from "../contexts/UserContext"
import Header from "../components/Header"
import homeStyle from '../stylesheets/homepage.module.css'
import ChatList from "../components/ChatList"
import FriendList from "../components/FriendList"
import UsersModal from "../components/UserModel"
import UserList from "../components/UserList"

export default function HomePage() {

    const [ loading, setLoading ] = useState(true)
    const { isLoggedIn } = useContext(UserContext)
    const [ showUsers, setShowUser] = useState(false)
    
    const navigate = useNavigate()

    useEffect(() => {
        if(!isLoggedIn) {
            navigate('/login')
            return
        }
        setLoading(false)
    },[isLoggedIn])

    function showUsersModalHandler() {
        if(showUsers) {
            setShowUser(false)
        } else {
            setShowUser(true)
        }
    }
    return (
        <>
            { loading ? <h1>Loading...</h1> : 
                <div className={homeStyle.wrapper}>
                    <Header />
                    <main>
                        <aside>
                            <FriendList />
                            <Link to="/users">Users</Link>
                            <Link to="/chats">Chats</Link>
                           
                        </aside>
                        <Outlet />
                        
                    </main>
                   
                </div> 
            }
        </>
    )
}