import { useEffect, useState } from "react"

export default function useDimen() {

    const [currentWidth, setCurrentWidth] = useState(0)
    const [deviceType, setDeviceType] = useState(null)

    useEffect(() => {
        function onChangeResize(e) {
            const window = e.target
            setCurrentWidth(window.innerWidth)
        }
        window.addEventListener('resize', onChangeResize)
        setCurrentWidth(innerWidth)
        return () => {
            window.removeEventListener('resize', onChangeResize)
        }
    },[])

    useEffect(() => {
        if(currentWidth > 768) {
            setDeviceType('desktop')
        } else {
            setDeviceType('mobile')
        }
    },[currentWidth])

    
    
    return { deviceType }
}