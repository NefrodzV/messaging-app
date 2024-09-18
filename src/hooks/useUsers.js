import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';

// Gives the users data for the user list
export default function useUsers() {
    const [users, setUsers] = useState(
        // Handles the undefined the useLoader gives if its not used with a loader
        useLoaderData()
    );
    const [status, setStatus] = useState(null);

    async function getUsers() {
        try {
            setStatus('pending');
            const request = await fetch(import.meta.env.VITE_API + '/users', {
                credentials: 'include',
                mode: 'cors',
            });

            const response = await request.json();
            if (!request.ok) {
                throw new Error(response.errors);
            }

            setUsers(response.users);
            setStatus('success');
        } catch (e) {
            console.error('Something went wrong getting users from api:' + e);
            setStatus('error');
        }
    }

    useEffect(() => {
        if (users === undefined || users.length === 0) getUsers();
    }, []);
    return { users, status };
}
