import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import style from '../stylesheets/Error.module.css'
export default function ErrorMessage({ message }) {
    const [text, setText] = useState('')
    const [active, setActive] = useState(false)
    const [deactive, setDeactive] = useState(false)
    const [mount, setMount] = useState(false)
    const [demount, setDemount] = useState(false)

    useEffect(() => {
        if (message) {
            setMount(true)
            setText(message)
            setActive(true)
        }
        if (!message && active) setDeactive(true)
    }, [message, active])

    useEffect(() => {
        if (demount) {
            setMount(false)
            setDemount(false)
            setText('')
        }
    }, [demount])

    return (
        <>
            {mount && !demount && (
                <div
                    className={`${style.error}`}
                    data-active={active}
                    data-deactive={deactive}
                    onAnimationEnd={() => {
                        if (deactive) {
                            setActive(false)
                            setDeactive(false)
                            setDemount(true)
                        }
                    }}
                >
                    {text}
                </div>
            )}
        </>
    )
}

Error.propTypes = {
    message: PropTypes.string,
}
