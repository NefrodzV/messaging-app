import { useState } from 'react';
import { ResizeableTextarea, MessageItem, SectionModal, Toast } from '..';
import { useChat, useUser } from '../../hooks';
import style from './Chat.module.css';
import userSvg from '../../assets/svgs/user.svg';
import FormImage from '../FormImage';
import ChatForm from './ChatForm';
import dummyPic1 from '../../assets/images/dane-deaner-_-KLkj7on_c-unsplash.jpg';

export default function Chat() {
    const [images, setImages] = useState([
        dummyPic1,
        dummyPic1,
        dummyPic1,
        dummyPic1,
        dummyPic1,
        dummyPic1,
        dummyPic1,
    ]);
    const [text, setText] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { chat, error, updateMessage, deleteMessage, sendMessage } =
        useChat();
    const [isEditing, setIsEditing] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const auth = useUser();
    const openDialog = (message) => {
        if (message.user.username != auth.user.username) return;
        setSelectedMessage(message);
        setIsDialogOpen(!isDialogOpen);
    };

    function onSubmit(e) {
        e.preventDefault();
        if (text.trim().length === 0) return;
        if (isEditing) {
            const editedMessage = {
                ...selectedMessage,
                text: text,
            };
            updateMessage(editedMessage, () => {
                // On success reset the values
                setIsEditing(false);
                setSelectedMessage(null);
                setText('');
            });
            return;
        }

        sendMessage(text, () => {
            // Success callback reset the text
            setText('');
        });
    }

    function cancelEdit() {
        setIsEditing(false);
        setSelectedMessage(null);
        setText('');
    }
    return (
        <section className={style.chat} aria-label="Chat">
            <header>
                <img
                    className={style.user}
                    src={chat?.user?.image.w56 || userSvg}
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
            <ChatForm
                user={chat?.user}
                text={text}
                setText={setText}
                images={images}
                onSubmit={onSubmit}
                cancelEdit={cancelEdit}
            />

            <SectionModal className={style.options} isOpen={isDialogOpen}>
                <header>
                    <h1>Options</h1>
                    <button
                        aria-label="Close options menu"
                        onClick={() => {
                            setIsDialogOpen(false);
                            setSelectedMessage(null);
                        }}
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
            {/* This will show when a error is present */}
            <Toast message={error} type={'error'} />
        </section>
    );
}
