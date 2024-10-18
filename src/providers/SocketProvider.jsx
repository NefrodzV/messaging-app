import { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useUser } from '../hooks';
const url = import.meta.env.VITE_API;
const socket = io(url, { withCredentials: true, transports: ['websocket'] });
export const SocketContext = createContext(null);

export default function SocketProvider({ children }) {
    const { user } = useUser();
    const [isConnected, setIsConnected] = useState(socket?.connected);
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
        if (isConnected && user) socket?.emit('join', user?.lastChat);
    }, [isConnected, user]);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
}
