import { useParams, useLocation } from 'react-router-dom';
import style from '../stylesheets/Chat.module.css';
import { useContext, useState, useEffect, useRef } from 'react';
import ResizeableTextarea from '../components/ResizeableTextarea';
import userSvg from '../assets/svgs/user.svg';
import propTypes from 'prop-types';
import { SocketContext } from '../providers/SocketProvider';
import MessageItem from './MessageItem';
export default function Chat() {
    const [text, setText] = useState('');
    const [data, setData] = useState(dataMock);
    const { socket, fooEvents } = useContext(SocketContext);
    const dummyRoomId = '123ers';
    useEffect(() => {
        socket.emit('join', dummyRoomId);
    }, []);

    useEffect(() => {
        console.log('Something happened to foo');
        console.log(fooEvents);
    }, [fooEvents]);
    return (
        <section className={style.chat} aria-label="Chat">
            <header>
                <img className={style.user} src={userSvg} alt="" />
                <h2 className={style.username}>Rose Vargas Hernandez</h2>
            </header>
            <section className={style.messageList}>
                {data?.map((message) => (
                    <MessageItem key={message._id} message={message} />
                ))}
            </section>
            <form
                className={style.sendMessage}
                style={{
                    position: 'relative',
                }}
                onSubmit={(e) => {
                    e.preventDefault();
                    socket.emit('message', dummyRoomId, text);
                }}
            >
                <div className={style.container}>
                    <ResizeableTextarea
                        className={'primary'}
                        value={text}
                        ariaLabel={'Enter message here'}
                        name={text}
                        id={text}
                        placeholder={'Enter message to Rose'}
                        maxRows={5}
                        onChangeHandler={(e) => {
                            setText(e.target.value);
                        }}
                    />
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
