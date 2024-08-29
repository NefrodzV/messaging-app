import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
// import chatStyle from '../stylesheets/chat.module.css'
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import Loader from './Loader';
import ChatHeader from './ChatHeader';

export default function CreateChat() {
    const {
        state: { user },
    } = useLocation();
    console.log(user);
    const { token } = useContext(UserContext);
    const navigate = useNavigate();

    const [params] = useSearchParams();
    const [loading, setLoading] = useState(true);
    //Other user that will be sent the message or start the chat with

    useEffect(() => {});
    async function createChat(message) {
        const body = {
            userId: params.get('userId'),
            message: message,
        };
        const response = await fetch('http://localhost:3000/api/chats', {
            method: 'POST',
            headers: {
                authorization: 'Bearer ' + token,
                'content-type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        if (!response.ok) {
            console.log(data.errors);
            throw new Error('Something went wrong with sending message...');
        }

        // Redirect to chat component
        navigate('/chat/' + data.chat.id);
    }

    // Checks chat existence between users and redirects if they do
    async function checkChatExistence() {
        const userId = params.get('userId');

        const response = await fetch(
            `http://localhost:3000/api/chats?userId=${userId}`,
            {
                headers: {
                    authorization: 'Bearer ' + token,
                },
            }
        );

        const data = await response.json();

        if (!response.ok) {
            // If there inst an already made chat get the selected user with id
            getUserWithId();
            return;
        }
        navigate('/chat/' + data.chat._id);
    }

    async function getUserWithId() {
        try {
            const userId = params.get('userId');
            const response = await fetch(
                `http://localhost:3000/api/chats?userId=${userId}`,
                {
                    headers: {
                        authorization: 'Bearer ' + token,
                    },
                }
            );

            const json = await response.json();
            if (!response.ok) {
                console.log(
                    'Something went wrong looking for user with id' +
                        json.errors
                );
                return;
            }
            setUser(json.user);
        } catch (e) {
            console.log('error happened getting user with id' + e);
        } finally {
            setLoading(false);
        }
    }
    // useEffect(() => {
    //     checkChatExistence()
    // },[token])
    function createChatHandler(e) {
        e.preventDefault();
        const message = e.target['message'].value;
        createChat(message);
    }

    return (
        <div className={chatStyle.chat}>
            <ChatHeader
                username={user?.profile?.username}
                image={user?.profile?.image}
            />
            {loading ? (
                <Loader />
            ) : (
                <>
                    <ul className={chatStyle.messagelist}>
                        Send a message to start a chat
                    </ul>
                    <form noValidate={true} onSubmit={createChatHandler}>
                        <div className={chatStyle.control}>
                            <input
                                type="text"
                                name="message"
                                id="message"
                                placeholder="Send message to start a chat with this user..."
                            />
                            <button>send</button>
                        </div>
                    </form>
                </>
            )}
        </div>
    );
}
