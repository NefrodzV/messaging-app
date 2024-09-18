
export function resetErrors(data, updateStateFunction) {
    const copy = structuredClone(data);
    for (const prop in copy) {
        copy[prop].error = '';
    }

    updateStateFunction(copy);
}
