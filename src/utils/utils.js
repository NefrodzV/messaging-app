export async function getUser() {
    try {
        const request = await fetch(import.meta.env.VITE_API + '/users/me', {
            credentials: 'include',
            mode: 'cors',
        });

        const response = await request.json();
        if (!request.ok) {
            console.error(response);
            return null;
        }

        return response.user;
    } catch (e) {
        console.error(e);
    }
}

export function resetErrors(data, updateStateFunction) {
    const copy = structuredClone(data);
    for (const prop in copy) {
        copy[prop].error = '';
    }

    updateStateFunction(copy);
}
