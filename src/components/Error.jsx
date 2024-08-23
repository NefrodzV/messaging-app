import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import style from '../stylesheets/Error.module.css'
export default function Error({ message }) {
    
    const [text, setText] = useState('')
    const [active,  setActive] = useState(false)
    const [deactive, setDeactive] = useState(false)
    const [mount, setMount] = useState(false)
    const [demount, setDemount] = useState(false)

    useEffect(() => {
        if(message) {
            setText(message)
            setActive(true)
            setMount(true)
        }
        if(!message && active) setDeactive(true)
    
    },[message, active])

    useEffect(() => {
        if(demount) {
            setMount(false)
            setDemount(false)
            setText('')
        }
    }, [demount])

    return (
    <>
        {mount && !demount && <div className={`${style.error}`} 
        data-active={active}
        data-deactive={deactive}
        onAnimationEnd={() => {
            if(deactive) {
                setActive(false)
                setDeactive(false)
                setDemount(true)
            }
            
        }}
        >{text}</div>}
    </>
        
        // <CSSTransition nodeRef={errorNode} in={isActive} 
        //     classNames="fade-transition"
        //     timeout={200}
        //     unmountOnExit
        //     >
        //     <div ref={errorNode} className={erroClass.error}>{error}</div>
        // </CSSTransition>
    )
}

Error.propTypes = {
    message: PropTypes.string,
    errors: PropTypes.object
}