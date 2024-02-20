import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import erroClass from '../stylesheets/error.module.css'
import '../stylesheets/fade.css'

export default function Error({name, errors}) {
    
    const [error, setError] = useState(null)
    const [isActive, setActive] = useState(false)

    useEffect(() => {
        // If errors undefined just return
        if(!errors) return
        if(Object.hasOwn(errors, name)) {
            if(isActive) return
            setError(errors[name])
            setActive(true)
            return
        }
        setActive(false)
    },[errors])

    return (
        <CSSTransition in={isActive} 
            classNames="fade-transition"
            timeout={200}
            unmountOnExit
            >
            <div className={erroClass.error}>{error}</div>
        </CSSTransition>
    )
}

Error.propTypes = {
    name: PropTypes.string,
    errors: PropTypes.object
}