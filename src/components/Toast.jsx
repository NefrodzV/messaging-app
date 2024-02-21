import { useRef } from "react"
import { CSSTransition } from "react-transition-group"
import PropTypes from 'prop-types'
import toastStyles from '../stylesheets/toast.module.css'
import '../stylesheets/fade.css'

export default function Toast({ message, isActive }) {

    const toastRef = useRef(null)
    
    return (
        <CSSTransition 
            nodeRef={toastRef}
            in={isActive}
            timeout={200}
            classNames="fade-transition"
            unmountOnExit
            >
            <div ref={toastRef} className={toastStyles.toast}>{message}</div>
            
        </CSSTransition>
    )
}

Toast.propTypes = {
    message: PropTypes.string,
    isActive: PropTypes.bool
}