import { useState } from 'react';

export default function useSignup() {
    const [errors, setErrors] = useState(null);
    const [status, setStatus] = useState(null);

    async function signup(data) {
        try {
            setStatus('pending');
            const request = await fetch(
                import.meta.env.VITE_API + '/session/signup',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                    mode: 'cors',
                    // credentials: 'same-origin',
                }
            );

            const response = await request.json();

            if (!request.ok) {
                setErrors(response.errors);
                setStatus('error');
                return;
            }
            setStatus('success');
            setErrors(null);
        } catch (e) {
            setStatus('error');
            console.error('Something went with signup:' + e);
        }
    }

    return { signup, status, errors };
}
