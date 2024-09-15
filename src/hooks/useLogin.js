import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function useLogin() {
    const [errors, setErrors] = useState(null);
    const [status, setStatus] = useState(null);
    const navigate = useNavigate();
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
            console.log(response);
            // Handle request errors
            if (!request.ok) {
                setErrors(response.errors);
                setStatus('error');
                return;
            }
            setStatus('success');
            navigate('/', { replace: true });
        } catch (e) {
            console.error(e);
        }
    }
    return { login, errors, status };
}
