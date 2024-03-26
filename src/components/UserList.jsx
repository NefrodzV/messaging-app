import UserCard from "./UserCard";
import { UserContext } from '../contexts/UserContext'
import style from "../stylesheets/userlist.module.css"
import { useContext, useEffect, useState } from "react";
import Loader from "./Loader";
export default function UserList() {

    const { token } = useContext(UserContext)
    const [users, setUsers] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function getUsers() {
            try {
                const response = await fetch('http://localhost:3000/api/users', 
                {
                    headers:{
                        "authorization" : "Bearer " + token
                    }
                })

                const json = await response.json()
                if(!response.ok) {
                    setError(json.errors)
                    return
                }
                setUsers(json.users)
            } catch(e) {
                setError("Something failed getting users list data" + e)
            } finally {
                setLoading(false)
            }
        }
        if(!token) return
        getUsers()

    },[token])
    
    return(
        <>  
            <h1>Users</h1>
            <ul className={
                loading ? null : style.wrapper
            }>
                {
                    loading ? 
                    <Loader /> : 
                    users?.map(user => <UserCard key={user._id} user={user} />)
                }
            </ul>
        </>
        
    )
}