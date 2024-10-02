import { useState } from 'react';
import { ResizeableTextarea, MessageItem, SectionModal, Toast } from '..';
import { useChat, useUser } from '../../hooks';
import style from './Chat.module.css';
import userSvg from '../../assets/svgs/user.svg';
import ChatForm from './ChatForm';
import dummyPic1 from '../../assets/images/dane-deaner-_-KLkj7on_c-unsplash.jpg';
import MessageOptions from './MessageOptions';

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

    function closeMessageOptions() {
        setIsDialogOpen(false);
        setSelectedMessage(null);
    }

    function onEditMessage() {
        setIsEditing(true);
        setText(selectedMessage.text);
        setIsDialogOpen(false);
    }

    function onDeleteMessage() {
        deleteMessage(selectedMessage);
        setIsDialogOpen(false);
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
            <MessageOptions
                isOpen={isDialogOpen}
                closeOptions={closeMessageOptions}
                editMessage={onEditMessage}
                deleteMessage={onDeleteMessage}
            />
            {/* This will show when a error is present */}
            <Toast message={error} type={'error'} />
        </section>
    );
}
