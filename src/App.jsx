import { RouterProvider } from 'react-router-dom';
import router from './Router';
import { UserContext } from './providers/UserProvider';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import UserProvider from './providers/UserProvider';
function App() {
    const [token, setToken] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const data = Cookies.get('token');
        setToken(data);
    });
    useEffect(() => {
        if (token) {
            // Cookies.set('token', token, { expires: 1 })
            setIsLoggedIn(true);
            getUser();
        } else {
            setIsLoggedIn(false);
        }
    }, [token]);

    async function getUser() {
        try {
            const response = await fetch(
                'https://messaging-api.adaptable.app/api/users/me',
                {
                    headers: {
                        authorization: 'Bearer ' + token,
                    },
                    mode: 'cors',
                    credentials: 'same-origin',
                }
            );
            const data = await response.json();
            if (!response.ok) {
                console.log(data);
                return console.error('error getting user', data.errors);
            }
            setUser(data.user);
        } catch (e) {
            throw new Error('Error getting user from api: ' + e);
        }
    }

    const updateUser = () => getUser();

    return <RouterProvider router={router} />;
}

export default App;
