import UserCard from './UserCard';
import style from '../stylesheets/userlist.module.css';
import { useContext, useEffect, useState } from 'react';
import Loader from './Loader';
export default function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getUsers() {
            try {
                const response = await fetch(
                    'https://messaging-api.adaptable.app/api/users',
                    {
                        headers: {
                            authorization: 'Bearer ' + token,
                        },
                        mode: 'cors',
                        credentials: 'same-origin',
                    }
                );

                const json = await response.json();
                if (!response.ok) {
                    setError(json.errors);
                    return;
                }
                setUsers(json.users);
            } catch (e) {
                setError('Something failed getting users list data' + e);
            } finally {
                setLoading(false);
            }
        }
        if (!token) return;
        getUsers();
    }, [token]);

    function load() {
        if (users.length === 0) {
            return (
                <div className={style.wrapper}>
                    <h2>No users available. Try again later.</h2>
                </div>
            );
        }

        return users?.map((user) => <UserCard key={user._id} user={user} />);
    }

    return (
        <>
            <h1 className="bg-secondary">Users</h1>
            <ul className={loading ? null : style.container}>
                {loading ? <Loader /> : load()}
            </ul>
        </>
    );
}
