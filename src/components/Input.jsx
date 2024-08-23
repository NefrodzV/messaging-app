import PropTypes from 'prop-types'
import ErrorMessage from './ErrorMessage'
import { useEffect, useState } from 'react'
export default function Input({
    value,
    type,
    name,
    id,
    label,
    placeholder,
    style,
    error,
    onChange,
    isRequired,
}) {
    return (
        <div className="input-container">
            <label htmlFor={id}>{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                name={name}
                id={id}
                required={isRequired}
                value={value}
                onChange={onChange}
            />
            <ErrorMessage message={error} />
        </div>
    )
}

Input.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    isRequired: PropTypes.bool,
}
