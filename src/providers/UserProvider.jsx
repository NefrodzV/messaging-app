import { useState, createContext } from 'react';
export default function UserProvider({ children }) {
    const [user, setUser] = useState({ username: 'user1' });
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export const UserContext = createContext(null);
