import { useState } from 'react';
import { ResizeableTextarea, MessageItem, SectionModal, Toast } from '..';
import { useChat, useUser } from '../../hooks';
import style from './Chat.module.css';
import userSvg from '../../assets/svgs/user.svg';
import ChatForm from './ChatForm';
import MessageOptions from './MessageOptions';

export default function Chat() {
    const [images, setImages] = useState([]);
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
                imageFiles: images
                    .filter((image) => Object.hasOwn(image, 'file'))
                    .map((image) => image.file),
                images: images.filter((image) => !Object.hasOwn(image, 'file')),
            };
            updateMessage(editedMessage, () => {
                // On success reset the values
                setIsEditing(false);
                setSelectedMessage(null);
                setText('');
                setImages([]);
            });
            return;
        }

        sendMessage(
            {
                text: text,
                images:
                    images.length === 0
                        ? null
                        : images.map((image) => image.file),
            },
            () => {
                // Success callback reset the text
                setText('');
                setImages([]);
            }
        );
    }

    function onFileChange(e) {
        const files = Array.from(e.target.files);
        files.forEach((file) => {
            const reader = new FileReader();
            reader.addEventListener(
                'load',
                () => {
                    const dataUrl = reader.result;
                    setImages((images) => [
                        ...images,
                        { file: file, dataUrl: dataUrl },
                    ]);
                },
                { once: true }
            );
            reader.readAsDataURL(file);
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
        setImages([...selectedMessage?.images]);
    }

    function onDeleteMessage() {
        deleteMessage(selectedMessage);
        setIsDialogOpen(false);
    }

    function deleteImage(url) {
        setImages((images) =>
            images.filter((image) => {
                if (Object.hasOwn(image, 'dataUrl')) {
                    return image.dataUrl !== url;
                } else {
                    return image.url !== url;
                }
            })
        );
    }

    function deleteAllImages() {
        setImages([]);
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
                isEditing={isEditing}
                user={chat?.user}
                text={text}
                setText={setText}
                images={images}
                onSubmit={onSubmit}
                cancelEdit={cancelEdit}
                onFileChange={onFileChange}
                deleteImage={deleteImage}
                deleteAllImages={deleteAllImages}
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
