import { useEffect, useState } from 'react';
import { Loader } from '.';
export default function Image({ url, className, alt }) {
    const [isLoading, setIsLoading] = useState(true);
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    useEffect(() => {
        if (!hasMounted) return;
        // If url has changed then apply loading state
        setIsLoading(true);
    }, [url]);
    return (
        // Needs position relative so loader can cover the image
        <div className="wrap-content">
            <img
                className={className}
                src={url}
                alt={alt}
                onLoad={() => {
                    setIsLoading(false);
                }}
            />
            {isLoading && <Loader covers={true} />}
        </div>
    );
}
