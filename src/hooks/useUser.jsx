import { useContext, useEffect, useState } from "react";
import { UserContext } from '../contexts/UserContext'
export default function useUser(){
    const { token } = useContext(UserContext)

    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)
    
    async function getUser() {
        try {
            const response = await fetch(
                'http://localhost:3000/api/users/me',
                {
                    headers: {
                        'authorization': 'Bearer ' + token
                    }
                }
            )
    
            const data = await response.json()
            if(!response.ok) {
                console.log(data)
                return console.error("error getting user", data.errors)
            }
            setUser(data.user)
        } catch(e) {
            throw new Error("Error getting user from api: " + e)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getUser()
    },[])

    return {
        user,
        loading
    }

}