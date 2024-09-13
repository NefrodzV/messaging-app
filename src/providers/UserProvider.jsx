import { useState, createContext } from 'react';
import { useLoaderData } from 'react-router-dom';
export default function UserProvider({ children }) {
    const [user, setUser] = useState(useLoaderData());
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export const UserContext = createContext(null);
