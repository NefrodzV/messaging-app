import PropTypes from 'prop-types'
import { useEffect, useState, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import erroClass from '../stylesheets/error.module.css'
import '../stylesheets/fade.css'

export default function Error({name, errors}) {
    
    const [error, setError] = useState(null)
    const [isActive, setActive] = useState(false)
    const errorNode = useRef(null)

    useEffect(() => {
        // If errors undefined just return
        if(!errors) return
        if(Object.hasOwn(errors, name)) {
            setError(errors[name])
            setActive(true)
            return
        }
        setActive(false)
    },[errors])

    return (
        <CSSTransition nodeRef={errorNode} in={isActive} 
            classNames="fade-transition"
            timeout={200}
            unmountOnExit
            >
            <div ref={errorNode} className={erroClass.error}>{error}</div>
        </CSSTransition>
    )
}

Error.propTypes = {
    name: PropTypes.string,
    errors: PropTypes.object
}