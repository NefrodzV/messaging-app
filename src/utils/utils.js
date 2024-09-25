export function resetErrors(data, updateStateFunction) {
    const copy = structuredClone(data);
    for (const prop in copy) {
        copy[prop].error = '';
    }

    updateStateFunction(copy);
}

export function isToday(date) {
    const today = new Date();
    return (
        today.getMonth() === date.getMonth() &&
        today.getDate() === date.getDate() &&
        today.getYear() === date.getYear()
    );
}

export function isYesterday(date) {
    const today = new Date();
    return (
        today.getMonth() === date.getMonth() &&
        today.getDate() - date.getDate() == 1 &&
        today.getYear() === date.getYear()
    );
}

export function formatDate(date) {
    if (isToday(date)) {
        return (
            'Today at ' +
            date.toLocaleTimeString(undefined, {
                hour: 'numeric',
                minute: 'numeric',
            })
        );
    } else if (isYesterday(date)) {
        return (
            'Yesterday at ' +
            date.toLocaleTimeString(undefined, {
                hour: 'numeric',
                minute: 'numeric',
            })
        );
    } else {
        return date.toLocaleDateString();
    }
}
