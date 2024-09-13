import { useState } from 'react';

export default function useLogin() {
    const [errors, setErrors] = useState(null);
    const [status, setStatus] = useState(null);

    async function login(data) {
        try {
            setStatus('pending');
            const request = await fetch(
                import.meta.env.VITE_API + '/session/login',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                    mode: 'cors',
                    credentials: 'include',
                }
            );

            const response = await request.json();

            // Handle request errors
            if (!request.ok) {
                setErrors(response.errors);
                setStatus('error');
                return;
            }
            setUser(response);
            setStatus('success');
        } catch (e) {
            console.error(e);
        }
    }
    return { login, errors, status };
}
