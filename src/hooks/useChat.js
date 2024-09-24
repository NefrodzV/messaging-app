import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useSocket } from './index';
// Returns a specific chat with id
export default function useChat() {
    const { chatId } = useParams();
    const { socket } = useSocket();
    const [chat, setChat] = useState(useLoaderData());
    const [error, setError] = useState('');
    const [status, setStatus] = useState(null);
    useEffect(() => {
        function onMessage(message) {
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

    useEffect(() => {
        // This will listen to a handler
        if (error) {
            setTimeout(() => {
                setError('');
            }, 2100);
        }
    }, [error]);
    function sendMessage(text, onSuccess) {
        onSuccess();
        setError('Message failed to send. Please try again');
        return;
        socket?.emit('message', chatId, text, (response) => {
            console.log('response');
            console.log(response);
            if (Object.hasOwn(response, 'errors')) {
                setError('Message failed to send. Please try again');
                return;
            }
            // Update the messages in the chat locally
            setChat((prev) => ({
                ...prev,
                messages: [...prev.messages, response.message],
            }));
            onSuccess();
        });
    }

    function updateMessage(message, onSuccess) {
        socket?.emit('edit', chatId, message, (response) => {
            if (Object.hasOwn(response, 'errors')) {
                setError('Update message failed. Please try again');
                return;
            }
            // Update the messages in the chat locally
            setChat((prev) => ({
                ...prev,
                messages: prev.messages.map((item) => {
                    if (item._id === response.message._id)
                        return response.message;
                    return item;
                }),
            }));
            onSuccess();
        });
    }

    function deleteMessage(message) {
        socket?.emit('delete', chatId, message, (response) => {
            if (Object.hasOwn(response, 'errors')) {
                setError('Delete message failed. Please try again');
                return;
            }
            // Update the messages in the chat locally
            setChat((prev) => ({
                ...prev,
                messages: prev.messages.filter(
                    (item) => item._id != message._id
                ),
            }));
        });
    }
    return { chat, error, updateMessage, deleteMessage, sendMessage };
}
