import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import './error.css'

export default function Error({name, errors}) {
    const [error, setError] = useState(null)
    const [isActive, setActive] = useState(false)

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
        <CSSTransition in={isActive} 
            classNames="error-transition"
            timeout={2000}
            >
            <div className='error'>{error}</div>
        </CSSTransition>
        
        
    )
}

Error.propTypes = {
    name: PropTypes.string,
    errors: PropTypes.object
}