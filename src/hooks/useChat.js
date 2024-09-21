import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useSocket } from './index';
// Returns a specific chat with id
export default function useChat() {
    const { chatId } = useParams();
    const { socket } = useSocket();
    const [chat, setChat] = useState(useLoaderData());
    console.log(chat);
    useEffect(() => {
        function onMessage(message) {
            console.log('Message from other user:');
            console.log(message);

            setChat((prev) => ({
                ...prev,
                messages: [...prev.messages, message],
            }));
        }

        function onDelete(message) {
            setChat((prev) => ({
                ...prev,
                messages: prev.messages.filter(
                    (item) => item._id != message._id
                ),
            }));
        }

        function onEdit(message) {
            setChat((prev) => ({
                ...prev,
                messages: prev.messages.map((item) => {
                    if (item._id === message._id) return message;
                    return item;
                }),
            }));
        }
        socket?.on('message', onMessage);
        socket?.on('delete', onDelete);
        socket?.on('edit', onEdit);
        return () => {
            console.log('removing listeners');
            // This listens to messages sent by other users
            socket?.off('message', onMessage);
            socket?.off('delete', onDelete);
            socket?.off('edit', onEdit);
        };
    }, []);
    useEffect(() => {
        socket?.emit('join', chatId);

        return () => {
            socket.emit('leave', chatId);
        };
    }, [chatId]);

    function sendMessage(text) {
        socket?.emit('message', chatId, text);
    }

    function updateMessage(message) {
        socket?.emit('edit', chatId, message);
    }

    function deleteMessage(message) {
        socket?.emit('delete', chatId, message);
    }
    return { chat, updateMessage, deleteMessage, sendMessage };
}
