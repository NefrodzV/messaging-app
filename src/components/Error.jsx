import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

export default function Error({name, errors}) {
    const [error, setError] = useState(null)
    
    useEffect(() => {
        // If errors undefined just return
        if(!errors) return
        if(Object.hasOwn(errors, name)) {
            setError(errors[name])
        }

    },[errors])

    return (
        <div className='error' data-visible={error ? true : false}>
            {error}
        </div>
    )
}

Error.propTypes = {
    name: PropTypes.string,
    errors: PropTypes.object
}