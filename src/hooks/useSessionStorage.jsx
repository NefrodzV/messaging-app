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

    function removeSavedLocation() {
        sessionStorage.removeItem('savedLocation')
    }
    return {
        savedLocation: JSON.parse(sessionStorage.getItem('savedLocation')),
        removeSavedLocation
    }
}