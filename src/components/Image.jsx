import { useEffect, useState } from 'react';
import { Loader } from '.';
export default function Image({ url, className, alt }) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (url) setIsLoading(true);
    }, [url]);
    return (
        // Needs position relative so loader can cover the image
        <div style={{ position: 'relative' }}>
            <img
                src={url}
                alt={alt}
                className={className}
                onLoad={() => {
                    setIsLoading(false);
                }}
            />
            {isLoading && <Loader covers={true} />}
        </div>
    );
}
