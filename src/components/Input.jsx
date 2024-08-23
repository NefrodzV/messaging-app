import PropTypes from 'prop-types'
import Error from './Error'
import { useEffect, useState } from 'react'
export default function Input({ type, name, id, label, placeholder, style, error }) {
    return(
        <div className='input-container'>
            <label htmlFor={id}>{label}</label>
            <input 
                
                type={type} 
                placeholder={placeholder} 
                name={name} 
                id={id} 
            />
            <Error 
                message={error} 
                />

        </div>
    )
}

Input.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    isRequired: PropTypes.bool
}