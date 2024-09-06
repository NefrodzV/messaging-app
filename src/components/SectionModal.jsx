import { useEffect, useState } from 'react';

export default function SectionModal({ children, isOpen, title, className }) {
    const [isMounted, setIsMounted] = useState(false);
    const [open, setOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        console.log(isOpen);
        if (isOpen) {
            setIsMounted(true);
            setOpen(true);
        }
        if (!isOpen) setIsClosing(true);
    }, [isOpen]);
    return (
        <>
            {isMounted && (
                <>
                    <dialog
                        className={className}
                        open={open}
                        data-closing={isClosing}
                        onAnimationEnd={() => {
                            if (isClosing) {
                                setIsClosing(false);
                                setOpen(false);
                                setIsMounted(false);
                            }
                        }}
                    >
                        {children}
                    </dialog>
                    <div
                        className="overlay"
                        data-show={open}
                        data-closing={isClosing}
                        open={open}
                    ></div>
                </>
            )}
        </>
    );
}
