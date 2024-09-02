import { io } from 'socket.io-client';

const url = import.meta.env.VITE_API;

export const socket = io(url);
