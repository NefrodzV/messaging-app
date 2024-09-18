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

export async function getChat(chatId) {
    try {
        const request = await fetch(
            import.meta.env.VITE_API + `/chats/${chatId}`,
            {
                mode: 'cors',
                credentials: 'include',
            }
        );

        const response = await request.json();
        if (!request.ok) {
            console.log('getting chats data error');
            throw {
                status: request.status,
                statusText: request.statusText,
                message: response.message,
            };
        }

        return response.chat;
    } catch (e) {
        console.error('Error getting chat with chatId: ' + e);
        return e;
    }
}
