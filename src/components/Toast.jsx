import { useEffect, useState } from 'react';
import style from '../stylesheets/Toast.module.css';
import errorSvg from '../assets/svgs/exclamation.svg';

const icons = {
    error: errorSvg,
};
export default function Toast({ message, type }) {
    const [isMounted, setIsMounted] = useState(false);
    const [isActive, setIsActive] = useState(false);
    useEffect(() => {
        if (message) {
            setIsMounted(true);
            setIsActive(true);
        }
    }, [message]);

    useEffect(() => {
        if (isActive) {
            setTimeout(() => {
                setIsActive(false);
            }, 2000);
        }
    }, [isActive]);
    return (
        <>
            {isMounted && (
                <div
                    className={`${style.toast} ${style[type]}`}
                    data-active={isActive}
                    onAnimationEnd={() => {
                        if (!isActive && isMounted) setIsMounted(false);
                    }}
                >
                    <span className={style.iconContainer}>
                        <img src={icons[type]} />
                    </span>
                    <span>{message}</span>
                </div>
            )}
        </>
    );
}
