import { useContext } from 'react';
import { SocketContext } from '../providers/SocketProvider';

export default function useSocket() {
    const context = useContext(SocketContext);
    if (!context)
        throw new Error('UseSocket hook not set up in a Socket Provider');

    return context;
}
