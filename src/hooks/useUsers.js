import { useState } from 'react';

// Gives the users data for the user list
export default function useUsers() {
    const [users, setUsers] = useState([]);
    const [status, setStatus] = useState(null);

    async function getUsers() {
        try {
            setStatus('pending');
            const request = await fetch(import.meta.env.VITE_API + '/users');

            const response = await request.json();
            if (!request.ok) {
                throw new Error(response.errors);
            }

            setUsers(response.users);
            setStatus('success');
        } catch (e) {
            console.error(
                'Something went wrong getting users from api:' +
                    JSON.stringify(e)
            );
            setStatus('error');
        }
    }
}
