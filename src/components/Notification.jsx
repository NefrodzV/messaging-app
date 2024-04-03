import { memo, useEffect, useRef } from "react";
const Notification = memo(function Notification({ text, notify }) {

    const notificationRef = useRef()
    useEffect(() => {
        if(!notify) return
        
        const notification = notificationRef.current
        notification.setAttribute('show', true)
        const id = setTimeout(() => {
            notification.removeAttribute('show')
        },2000)

        // return () => {
        //     clearTimeout(id)
        // }
    }, [notify])
    return (
        <div ref={notificationRef} className="notification m-top-margin" >
            <p>{text}</p>
        </div>
    )
})
export default Notification

