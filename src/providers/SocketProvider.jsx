import { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
const url = import.meta.env.VITE_API;

export const SocketContext = createContext(null);

export default function SocketProvider({ children }) {
    const [socket, setSocket] = useState(io(url, { withCredentials: true }));
    const [isConnected, setIsConnected] = useState(socket.connected);
    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        socket?.on('connect', onConnect);
        socket?.on('disconnect', onDisconnect);

        return () => {
            socket?.off('connect', onConnect);
            socket?.off('disconnect', onDisconnect);
        };
    }, []);

    useEffect(() => {
        const logMessage = isConnected
            ? 'socket connected'
            : 'socket disconnected';
        console.log(logMessage);
    }, [isConnected]);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
}
