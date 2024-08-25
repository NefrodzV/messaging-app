import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
export default function useUser() {
    const { user, setUser } = UserContext;

    async function getUser() {
        try {
            const response = await fetch(
                'https://messaging-api.adaptable.app/api/users/me',
                {
                    headers: {
                        authorization: 'Bearer ' + token,
                    },
                    mode: 'cors',
                }
            );

            const data = await response.json();
            if (!response.ok) {
                return console.error('error getting user', data.errors);
            }
            setUser(data.user);
        } catch (e) {
            throw new Error('Error getting user from api: ' + e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    return {
        user,
        setUser,
        loading,
    };
}
