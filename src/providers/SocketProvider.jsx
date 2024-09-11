import { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
const url = import.meta.env.VITE_API;

export const SocketContext = createContext(null);

export default function SocketProvider({ children }) {
    const [fooEvents, setFooEvents] = useState([]);
    const [socket, setSocket] = useState(io(url));
    const [isConnected, setIsConnected] = useState(socket.connected);
    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
            console.log('connected to socket');
            console.log(socket?.id);
        }

        function onDisconnect() {
            console.log('disconnecting from socket');
            setIsConnected(false);
        }

        function onFooEvent(text) {
            setFooEvents((previous) => [...previous, text]);
            console.log('An event on foo has happened with this value');
        }

        const onUpdate = (message) =>
            console.log('data from scoket id: ' + message);

        socket?.on('connect', onConnect);
        socket?.on('disconnect', onDisconnect);
        socket?.on('foo', onFooEvent);
        socket?.on('update', onUpdate);

        return () => {
            socket?.off('connect', onConnect);
            socket?.off('disconnect', onDisconnect);
            socket?.off('foo', onFooEvent);
            socket.off('update', on);
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket, fooEvents }}>
            {children}
        </SocketContext.Provider>
    );
}
