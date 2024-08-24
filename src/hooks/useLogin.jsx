import { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext.jsx';
import Cookies from 'js-cookie';

export default function useLogin() {
    const { setToken } = useContext(UserContext);
    const [errors, setErrors] = useState(null);
    const [status, setStatus] = useState(null);

    async function login(data) {
        console.log(data);
        try {
            setStatus('pending');
            const request = await fetch(
                import.meta.env.VITE_API + '/session/login',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                    mode: 'cors',
                }
            );

            const response = await request.json();

            // Handle request errors
            if (!request.ok) {
                setErrors(response.errors);
                setStatus('error');
                return;
            }

            // Cookies.set('token', response.token, { expires: 1 });
            // setToken(response.token);
            // setErrors({});
            // setStatus('success');
        } catch (e) {
            console.error(e);
        }
    }
    return { login, errors, status };
}
