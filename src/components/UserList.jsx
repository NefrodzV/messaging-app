import UserCard from "./UserCard";
import { UserContext } from '../contexts/UserContext'
import style from "../stylesheets/userlist.module.css"
import { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
export default function UserList() {

    const { token } = useContext(UserContext)
    const { data, status } = useQuery({
        queryKey: ['users'],
        queryFn : async() => {
            const response = await fetch('http://localhost:3000/api/users', {
                headers:{
                    "authorization" : "Bearer " + token
                }
            })
            
            return await response.json()
        },
    })

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if(status === "success") {
            setLoading(false)
        } else {
            setLoading(true)
        }
    },[status])
    
    return(
        <ul className={style.wrapper}>
            {
                loading ? 
                <div>Loading...</div> : 
                data?.users?.map(user => <UserCard key={user._id} user={user} />)
            }
        </ul>
    )
}