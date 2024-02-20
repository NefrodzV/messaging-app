import { useState } from "react";
import { CSSTransition } from "react-transition-group";

// Example of how the transition dependency works
export default function TransitionExample() {

    const [isActive, setActive] = useState(false)
    
    const applyTransition = () => {
        console.log(isActive)
        if(!isActive) {
            setActive(true)
            return
        }
        setActive(false)
        
    }

    return (
        <>
            <button onClick={applyTransition}>Apply transition</button>
            <CSSTransition 
                in={isActive}
                classNames='error-transition'
                timeout={2000}
                
                >
                <h1 className="example">{isActive ? "isActive" : "notActive"}</h1>
            </CSSTransition>
            
        </>
        
    )
}