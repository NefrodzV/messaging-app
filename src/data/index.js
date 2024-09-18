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

export async function getUsers() {
    try {
        const request = await fetch(import.meta.env.VITE_API + '/users', {
            credentials: 'include',
            mode: 'cors',
        });

        const response = await request.json();
        if (!request.ok) {
            console.error(e);
            return null;
        }
        return response.users;
    } catch (e) {
        console.error(e);
    }
}
