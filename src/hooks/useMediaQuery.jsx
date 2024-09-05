import { useEffect, useState } from 'react';
import propTypes from 'prop-types';
export default function useMediaQuery(query) {
    const [queryIsActive, setQueryIsActive] = useState(
        window.matchMedia(query).matches
    );

    useEffect(() => {
        function onResizeHandler() {
            setQueryIsActive(window.matchMedia(query).matches);
        }

        window.addEventListener('resize', onResizeHandler);

        return () => {
            window.removeEventListener('resize', onResizeHandler);
        };
    }, [query]);

    return { queryIsActive };
}

useMediaQuery.propTypes = {
    query: propTypes.string,
};
