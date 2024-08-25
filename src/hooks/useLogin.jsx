import { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext.jsx';
import { useNavigate } from 'react-router-dom';

export default function useLogin() {
    const { setUser } = useContext(UserContext);
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
            const token = {
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Y…IxMX0.w5mWAhqkNwiDBFUnkvBdV_zHCb0__9bl7JxDzvOrS5E',
            };
            navigate('/' + token);
        } catch (e) {
            console.error(e);
        }
    }
    return { login, errors, status };
}
