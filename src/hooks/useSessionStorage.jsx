import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function useSessionStorage() {
    const { pathname, state } = useLocation()
    const sessionStorage = window.sessionStorage
    
    useEffect(() => {
        return () => {
            if(pathname === "/") return
            const savedLocation = {
                pathname: pathname,
                state: state
            }
            const json = JSON.stringify(savedLocation)
            sessionStorage.setItem('savedLocation', json)
        }
    },[])

    return {
        savedLocation: JSON.parse(sessionStorage.getItem('savedLocation')),
        removeSavedLocation: () => {
            sessionStorage.removeItem('savedLocation')
        }
    }
}