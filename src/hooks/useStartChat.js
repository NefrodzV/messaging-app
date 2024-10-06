import { useState } from 'react';
import { json, useNavigate } from 'react-router-dom';
import useUser from './useUser';

export default function useStartChat() {
    const [status, setStatus] = useState(null);
    const { setUser } = useUser();
    const navigate = useNavigate();
    async function startChat(userId) {
        try {
            setStatus('pending');
            const request = await fetch(import.meta.env.VITE_API + '/chats', {
                method: 'post',
                mode: 'cors',
                credentials: 'include',
                body: JSON.stringify({ userId: userId }),
                headers: {
                    'content-type': 'application/json',
                },
            });
            const response = await request.json();
            if (!request.ok) {
                throw JSON.stringify(response.errors);
            }

            if (Object.hasOwn(response, 'chat')) {
                setUser((user) => ({
                    ...user,
                    chats: [...user.chats, response.chat],
                }));
            }
            console.log('response is');
            console.log(response);
            setStatus('success');
            navigate('/chats/' + response.chatId);
        } catch (e) {
            console.error('Error starting a new chat :' + e);
        }
    }

    return { status, startChat };
}
