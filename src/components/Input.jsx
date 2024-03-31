import PropTypes from 'prop-types'
export default function Input({type, name, id, label, placeholder, style}) {
    return(
        <>
            <label htmlFor={id}>{label}</label>
            <input 
                className={`primary-outline ${style}`} 
                type={type} 
                placeholder={placeholder} 
                name={name} 
                id={id} 
            />
        </>
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