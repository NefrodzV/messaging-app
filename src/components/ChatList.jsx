import style from '../stylesheets/ChatList.module.css';
import { useContext, useEffect, useRef, useState } from 'react';
import ChatItem from '../components/ChatItem';
import useUser from '../hooks/useUser.js';
import { SocketContext } from '../providers/SocketProvider';
import CenteredWrapper from './CenteredWrapper';
import { Link } from 'react-router-dom';
export default function ChatList() {
    const { user } = useUser();
    const { chats } = user;
    // const [data, setData] = useState(dataMock);

    const { socket } = useContext(SocketContext);

    useEffect(() => {
        const onUpdate = (message) =>
            console.log('data from scoket id: ' + message);

        socket?.on('update', onUpdate);

        return () => {
            socket?.off('update', onUpdate);
        };
    }, []);
    return (
        <section className={style.chatList} aria-label="Chats">
            <header className={style.header}>
                <h1>Your chats</h1>
                <Link
                    className={`${style.add}`}
                    aria-label="Go start a new chat"
                    title="Start a new chat"
                    to={'/users'}
                >
                    <svg
                        className="icon"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                    >
                        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
                    </svg>
                </Link>
            </header>
            <div className={style.container}>
                {chats.length != 0 ? (
                    chats?.map((chatItem, i) => (
                        <ChatItem
                            key={chatItem._id}
                            chat={chatItem}
                            delayAnim={`${i * 0.2}s`}
                        />
                    ))
                ) : (
                    <CenteredWrapper text={'No chats started by you'} />
                )}
            </div>
        </section>
    );
}

const dataMock = [
    {
        _id: 'post001',
        text: 'Exploring the wonders of the universe!',

        user: {
            username: 'astro_lover',
            _id: 'user123',
            imgUrl: 'https://example.com/images/universe.jpg',
        },
        date: new Date('2024-09-01T08:30:00Z').toLocaleString(),
    },
    {
        _id: 'post002',
        text: 'Just made the best coffee ever!',

        user: {
            username: 'coffee_enthusiast',
            _id: 'user456',
            imgUrl: 'https://example.com/images/coffee.jpg',
        },
        date: new Date('2024-09-01T09:00:00Z').toLocaleString(),
    },
    {
        _id: 'post003',
        text: 'Had a great workout session today.',

        user: {
            username: 'fit_fanatic',
            _id: 'user789',
            imgUrl: 'https://example.com/images/workout.jpg',
        },
        date: new Date('2024-09-01T10:15:00Z').toLocaleString(),
    },
    {
        _id: 'post004',
        text: 'Check out this beautiful sunset!',
        user: {
            username: 'nature_lover',
            _id: 'user101',
            imgUrl: 'https://example.com/images/sunset.jpg',
        },
        date: new Date('2024-09-01T18:45:00Z').toLocaleString(),
    },
    {
        _id: 'post005',
        text: 'Learning to code with JavaScript.',

        user: {
            username: 'code_newbie',
            _id: 'user102',
            imgUrl: 'https://example.com/images/javascript.jpg',
        },
        date: new Date('2024-09-01T11:30:00Z').toLocaleString(),
    },
    {
        _id: 'post006',
        text: 'Just finished reading a fantastic book.',

        user: {
            username: 'bookworm',
            _id: 'user103',
            imgUrl: 'https://example.com/images/book.jpg',
        },
        date: new Date('2024-09-01T14:00:00Z').toLocaleString(),
    },
    {
        _id: 'post007',
        text: 'Weekend getaway at the beach.',

        user: {
            username: 'travel_junkie',
            _id: 'user104',
            imgUrl: 'https://example.com/images/beach.jpg',
        },
        date: new Date('2024-09-01T15:30:00Z').toLocaleString(),
    },
    {
        _id: 'post008',
        text: 'Delicious homemade pizza night!',

        user: {
            username: 'foodie',
            _id: 'user105',
            imgUrl: 'https://example.com/images/pizza.jpg',
        },
        date: new Date('2024-09-01T19:00:00Z').toLocaleString(),
    },
    {
        _id: 'post009',
        text: 'Just adopted a cute puppy!',

        user: {
            username: 'dog_lover',
            _id: 'user106',
            imgUrl: 'https://example.com/images/puppy.jpg',
        },
        date: new Date('2024-09-01T13:00:00Z').toLocaleString(),
    },
    {
        _id: 'post010',
        text: 'Excited for the new movie release!',

        user: {
            username: 'film_buff',
            _id: 'user107',
            imgUrl: 'https://example.com/images/movie.jpg',
        },
        date: new Date('2024-09-01T20:00:00Z').toLocaleString(),
    },
];
