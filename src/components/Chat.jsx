import { useParams, useLocation, useLoaderData } from 'react-router-dom';
import { useContext, useState, useEffect, useRef } from 'react';
import { ResizeableTextarea, MessageItem, SectionModal } from '../components';
import { useChat } from '../hooks';
import style from '../stylesheets/Chat.module.css';
import userSvg from '../assets/svgs/user.svg';

export default function Chat() {
    const [text, setText] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { chat, updateMessage, deleteMessage, sendMessage } = useChat();
    const [isEditing, setIsEditing] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);

    const openDialog = (message) => {
        setSelectedMessage(message);
        setIsDialogOpen(!isDialogOpen);
    };
    return (
        <section className={style.chat} aria-label="Chat">
            <header>
                <img
                    className={style.user}
                    src={chat?.user.image || userSvg}
                    alt={`${chat.user.username} profile image`}
                />
                <h2 className={style.username}>{chat?.user?.username}</h2>
            </header>
            <section className={style.messageList}>
                {chat?.messages?.map((message) => {
                    return (
                        <MessageItem
                            key={message._id}
                            message={message}
                            onClick={openDialog}
                        />
                    );
                })}
            </section>
            <form
                className={style.sendMessage}
                style={{
                    position: 'relative',
                }}
                onSubmit={(e) => {
                    e.preventDefault();
                    if (text.trim().length === 0) return;
                    if (isEditing) {
                        const editedMessage = {
                            ...selectedMessage,
                            text: text,
                        };
                        updateMessage(editedMessage);
                        setIsEditing(false);
                        setSelectedMessage(null);
                        setText('');
                        return;
                    }

                    sendMessage(text);
                }}
            >
                <div className={style.container}>
                    <div className={style.wrapper}>
                        {isEditing && (
                            <label className={style.label}>
                                Edit message...
                                <button
                                    onClick={() => {
                                        setIsEditing(false);
                                        setSelectedMessage(null);
                                        setText('');
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 384 512"
                                    >
                                        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"></path>
                                    </svg>
                                </button>
                            </label>
                        )}
                        <ResizeableTextarea
                            className={'primary'}
                            value={text}
                            ariaLabel={'Enter message here'}
                            name={text}
                            id={text}
                            placeholder={`Enter message to ${chat.user.username}`}
                            maxRows={5}
                            onChangeHandler={(e) => {
                                setText(e.target.value);
                            }}
                        />
                    </div>
                    <button
                        className={style.sendButton}
                        title="Send message button"
                        aria-label="Send message"
                    >
                        <svg
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g id="Paper_Plane" data-name="Paper Plane">
                                <path d="M21.061,11.077,3.741,4.157a.994.994,0,0,0-1.17.32,1,1,0,0,0-.01,1.22l4.49,6a.525.525,0,0,1-.01.62L2.511,18.3a1.02,1.02,0,0,0,0,1.22,1,1,0,0,0,.8.4,1.021,1.021,0,0,0,.38-.07l17.36-6.9a1.006,1.006,0,0,0,.01-1.87ZM3.371,5.087l16.06,6.42H8.061a1.329,1.329,0,0,0-.21-.41Zm-.06,13.82,4.53-5.98a1.212,1.212,0,0,0,.22-.42h11.38Z" />
                            </g>
                        </svg>
                    </button>
                </div>
            </form>

            <SectionModal className={style.options} isOpen={isDialogOpen}>
                <header>
                    <h1>Options</h1>
                    <button
                        aria-label="Close options menu"
                        onClick={openDialog}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 384 512"
                        >
                            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"></path>
                        </svg>
                    </button>
                </header>
                <section>
                    <button
                        className={style.option}
                        onClick={() => {
                            setIsEditing(true);
                            setText(selectedMessage.text);
                            editedMessage;
                            setIsDialogOpen(false);
                            // TODO DO OTHER LOGIC FOR THE EDIT MESSAGE
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                        >
                            <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
                        </svg>
                        Edit
                    </button>
                    {/* Make the logic to delete a message */}
                    <button
                        className={style.option}
                        onClick={() => {
                            deleteMessage(selectedMessage);
                            setIsDialogOpen(false);
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                        >
                            <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
                        </svg>
                        Delete
                    </button>
                </section>
            </SectionModal>
        </section>
    );
}

const dataMock = [
    {
        _id: 'post001',
        user: {
            username: 'john_doe',
        },
        text: 'Just had a great day at the park!',
        date: '2024-09-04T10:30:00Z',
        imgs: [
            'https://example.com/images/park1.jpg',
            'https://example.com/images/park2.jpg',
        ],
    },
    {
        _id: 'post002',
        user: {
            username: 'jane_smith',
        },
        text: 'Check out my new recipe!',
        date: '2024-09-03T15:00:00Z',
        imgs: [
            'https://example.com/images/recipe1.jpg',
            'https://example.com/images/recipe2.jpg',
        ],
    },
    {
        _id: 'post003',
        user: {
            username: 'alice_johnson',
        },
        text: 'Loving the new book I’m reading!',
        date: '2024-09-02T20:45:00Z',
        imgs: ['https://example.com/images/book1.jpg'],
    },
    {
        _id: 'post004',
        user: {
            username: 'bob_brown',
        },
        text: 'Had a wonderful time at the concert!',
        date: '2024-09-01T22:00:00Z',
        imgs: [
            'https://example.com/images/concert1.jpg',
            'https://example.com/images/concert2.jpg',
        ],
    },
];
