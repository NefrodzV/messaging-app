import style from '../stylesheets/UserList.module.css';
import { useContext, useEffect, useState } from 'react';
import userSvg from '../assets/svgs/user.svg';
import UserItem from './UserItem';
import Loader from './Loader';
import CenteredWrapper from './CenteredWrapper';
import useUsers from '../hooks/useUsers';
export default function UserList({ isOpen, onClose }) {
    const { users, status } = useUsers();
    const [animState, setAnimState] = useState({
        isMounted: false,
        isShowing: false,
    });

    const { isMounted, isShowing } = animState;

    useEffect(() => {
        if (isOpen) {
            setAnimState({ ...animState, isShowing: true, isMounted: true });
        }
        if (!isOpen) {
            setAnimState({ ...animState, isShowing: false });
        }
    }, [isOpen]);

    return (
        <>
            {isMounted && (
                <dialog
                    className={style.dialog}
                    open={isShowing}
                    onAnimationEnd={() => {
                        if (!isShowing) {
                            setAnimState({
                                ...animState,
                                isMounted: false,
                            });
                        }
                    }}
                >
                    <header className={style.header}>
                        <h1>Users</h1>
                        <div className={style.buttons}>
                            <button
                                title="Search for a user"
                                aria-label="Press here to open search for user"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                >
                                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                                </svg>
                            </button>
                            <button
                                aria-label="Button to close modal"
                                title="Close button"
                                onClick={onClose}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512"
                                >
                                    <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                                </svg>
                            </button>
                        </div>
                    </header>
                    <div className={style.container}>
                        {status === 'pending' ? (
                            <Loader />
                        ) : users.length != 0 ? (
                            users?.map((user) => <UserItem user={user} />)
                        ) : (
                            <CenteredWrapper text={'No users in list'} />
                        )}
                    </div>
                </dialog>
            )}
        </>
    );
}

const dataMock = [
    {
        username: 'john_doe',
        _id: 'user123',
        imgUrl: 'https://example.com/images/john_doe.jpg',
    },
    {
        username: 'jane_smith',
        _id: 'user456',
        imgUrl: 'https://example.com/images/jane_smith.jpg',
    },
    {
        username: 'alice_johnson',
        _id: 'user789',
        imgUrl: 'https://example.com/images/alice_johnson.jpg',
    },
    {
        username: 'bob_brown',
        _id: 'user101',
        imgUrl: 'https://example.com/images/bob_brown.jpg',
    },
];
