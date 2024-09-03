import { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
const url = import.meta.env.VITE_API;
export const socket = io(url);
export const SocketContext = createContext(socket);

export default function SocketProvider({ children }) {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [fooEvents, setFooEvents] = useState([]);

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
            console.log('connected to socket');
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function onFooEvent(text) {
            setFooEvents((previous) => [...previous, text]);
            console.log('An event on foo has happened with this value');
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('foo', onFooEvent);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('foo', onFooEvent);
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket, fooEvents }}>
            {children}
        </SocketContext.Provider>
    );
}
