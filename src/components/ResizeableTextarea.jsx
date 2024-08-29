import { useEffect, useState, useRef } from 'react';

export default function ResizeableTextarea({
    className,
    maxRows,
    onChangeHandler,
    value,
    name,
    placeholder,
    id,
    label,
    rows,
    cols,
    ariaLabel,
}) {
    const [defaultRows, setDefaultRows] = useState(1);
    const [hiddenTextareaDimen, setHiddenTextareaDimen] = useState({
        width: 0,
    });
    const hiddenTextareaRef = useRef(null);
    const textareaRef = useRef(null);

    useEffect(() => {
        /** Set the width for the hidden textarea and check
         * if there is different row change*/
        if (rows) setDefaultRows(rows);
        const textarea = textareaRef?.current;

        setHiddenTextareaDimen({
            width: window
                .getComputedStyle(textarea, null)
                .getPropertyValue('width'),
        });
    }, []);

    useEffect(() => {
        /**
         *  To be able to calculate the lines of the text area
         *  rows must always be one , line height has to be px set in css and
         *  you must apply the same font size for the hidden textarea
         */
        /*  Default substract is because default rows is 2 (Chrome) and no matter
            how you calculate the lines it will calculate
            the scroll size as if 2 rows exists.
            We get the correct line height and divide it by the scroll 
            height and default
            substract and it should give the corrct number of lines,
            then if lines is not equal to rows then the textarea should
            increase or decrease
        */
        const defaultSubstract = 1;
        const hiddenTextarea = hiddenTextareaRef?.current;
        const lineHeight = window
            .getComputedStyle(hiddenTextarea, null)
            .getPropertyValue('line-height');
        const lines =
            Math.ceil(hiddenTextarea.scrollHeight / parseInt(lineHeight)) -
            defaultSubstract;
        console.log(lines);
        if (lines !== defaultRows) {
            setDefaultRows(lines);
        }
    }, [value]);
    return (
        <>
            {label && <label htmlFor={id}>{label}</label>}
            <textarea
                aria-label={ariaLabel}
                ref={textareaRef}
                className={className}
                rows={defaultRows}
                value={value}
                placeholder={placeholder}
                onChange={onChangeHandler}
                name={name}
                id={id}
                cols={cols}
            />

            {/*  Hidden textarea so that I can calculate
             the number of rows the text is taking */}

            <textarea
                ref={hiddenTextareaRef}
                className={className}
                aria-hidden={true}
                rows={1}
                style={{
                    // visibility: 'hidden',
                    // zIndex: -1,
                    width: hiddenTextareaDimen.width,
                    position: 'absolute',
                    top: '-250px',
                }}
                value={value}
                readOnly
            />
        </>
    );
}
