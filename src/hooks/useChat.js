import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useSocket } from './index';
// Returns a specific chat with id
export default function useChat() {
    const { chatId } = useParams();
    const { socket } = useSocket();
    const data = useLoaderData();
    const [chat, setChat] = useState(data);
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
            // This listens to messages sent by other users
            socket?.off('message', onMessage);
            socket?.off('delete', onDelete);
            socket?.off('edit', onEdit);
        };
    }, []);
    useEffect(() => {
        setChat(data);
    }, [data]);
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
    function isLessThan100MB(files) {
        if (!Array.isArray(files))
            throw new Error('Files are not an array type');
        if (files.length === 0 || files === undefined || files === null)
            return null;
        const total = files.reduce(
            (acumulator, currentFile) =>
                acumulator + currentFile.size / 1024 ** 2,
            0
        );

        return total < 100;
    }
    function sendMessage(message, onSuccess) {
        const isValidFileSize = message.images
            ? isLessThan100MB(message.images)
            : null;
        if (isValidFileSize === false) {
            setError('Files total size must be less than 100MB.');
            return;
        }

        socket?.emit('message', chatId, message, (response) => {
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
        const isValidFileSize = isLessThan100MB(message.imageFiles);
        if (isValidFileSize === false) {
            setError('Files total size must be less than 100MB.');
        }
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
