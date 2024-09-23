import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useSocket } from './index';
// Returns a specific chat with id
export default function useChat() {
    const { chatId } = useParams();
    const { socket } = useSocket();
    const [chat, setChat] = useState(useLoaderData());
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
        socket?.emit('message', chatId, text, (response) => {
            console.log('response');
            console.log(response);
            if (Object.hasOwn(response, 'errors')) {
                console.log('some errors has happened sending the message');
                console.log(errors);
                return;
            }
            // Update the messages in the chat locally
            setChat((prev) => ({
                ...prev,
                messages: [...prev.messages, response.message],
            }));
        });
    }

    function updateMessage(message) {
        socket?.emit('edit', chatId, message, (response) => {
            if (Object.hasOwn(response, 'errors')) {
                console.log('some errors has happened updating the message');
                console.log(errors);
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
        });
    }

    function deleteMessage(message) {
        socket?.emit('delete', chatId, message, (response) => {
            if (Object.hasOwn(response, 'errors')) {
                console.log('some errors has happened deleting the message');
                console.log(errors);
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
    return { chat, updateMessage, deleteMessage, sendMessage };
}
