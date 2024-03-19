import { useState } from "react"

export default function useDimen() {

    const { innerWidth } = window
    const [currentWidth, setCurrentWidth] = useState(0)
    

    window.addEventListener('resize', () => {
        setCurrentWidth(innerWidth)
    })

    return { currentWidth }
}