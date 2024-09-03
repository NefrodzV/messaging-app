import UserCard from './UserCard';
import style from '../stylesheets/UserList.module.css';
import { useContext, useEffect, useState } from 'react';
import Loader from './Loader';
import userSvg from '../assets/svgs/user.svg';
export default function UserList() {
    return (
        <dialog className={style.dialog}>
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
                <article className={style.user}>
                    <img src={userSvg} alt="" />
                    <span>Wesley Vargas Borrrero</span>
                    <button
                        title="Start chat with this user"
                        aria-label="Start chat with this user"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                        >
                            <path
                                fill="currentColor"
                                d="M64 0C28.7 0 0 28.7 0 64L0 352c0 35.3 28.7 64 64 64l96 0 0 80c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L309.3 416 448 416c35.3 0 64-28.7 64-64l0-288c0-35.3-28.7-64-64-64L64 0z"
                            />
                        </svg>
                    </button>
                </article>
                <article className={style.user}>
                    <img src={userSvg} alt="" />
                    <span>Wesley Vargas Borrrero</span>
                    <button
                        title="Start chat with this user"
                        aria-label="Start chat with this user"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                        >
                            <path
                                fill="currentColor"
                                d="M64 0C28.7 0 0 28.7 0 64L0 352c0 35.3 28.7 64 64 64l96 0 0 80c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L309.3 416 448 416c35.3 0 64-28.7 64-64l0-288c0-35.3-28.7-64-64-64L64 0z"
                            />
                        </svg>
                    </button>
                </article>
                <article className={style.user}>
                    <img src={userSvg} alt="" />
                    <span>Wesley Vargas Borrrero</span>
                    <button
                        title="Start chat with this user"
                        aria-label="Start chat with this user"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                        >
                            <path
                                fill="currentColor"
                                d="M64 0C28.7 0 0 28.7 0 64L0 352c0 35.3 28.7 64 64 64l96 0 0 80c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L309.3 416 448 416c35.3 0 64-28.7 64-64l0-288c0-35.3-28.7-64-64-64L64 0z"
                            />
                        </svg>
                    </button>
                </article>{' '}
                <article className={style.user}>
                    <img src={userSvg} alt="" />
                    <span>Wesley Vargas Borrrero</span>
                    <button
                        title="Start chat with this user"
                        aria-label="Start chat with this user"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                        >
                            <path
                                fill="currentColor"
                                d="M64 0C28.7 0 0 28.7 0 64L0 352c0 35.3 28.7 64 64 64l96 0 0 80c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L309.3 416 448 416c35.3 0 64-28.7 64-64l0-288c0-35.3-28.7-64-64-64L64 0z"
                            />
                        </svg>
                    </button>
                </article>
                <article className={style.user}>
                    <img src={userSvg} alt="" />
                    <span>Wesley Vargas Borrrero</span>
                    <button
                        title="Start chat with this user"
                        aria-label="Start chat with this user"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                        >
                            <path
                                fill="currentColor"
                                d="M64 0C28.7 0 0 28.7 0 64L0 352c0 35.3 28.7 64 64 64l96 0 0 80c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L309.3 416 448 416c35.3 0 64-28.7 64-64l0-288c0-35.3-28.7-64-64-64L64 0z"
                            />
                        </svg>
                    </button>
                </article>
                <article className={style.user}>
                    <img src={userSvg} alt="" />
                    <span>Wesley Vargas Borrrero</span>
                    <button
                        title="Start chat with this user"
                        aria-label="Start chat with this user"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                        >
                            <path
                                fill="currentColor"
                                d="M64 0C28.7 0 0 28.7 0 64L0 352c0 35.3 28.7 64 64 64l96 0 0 80c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L309.3 416 448 416c35.3 0 64-28.7 64-64l0-288c0-35.3-28.7-64-64-64L64 0z"
                            />
                        </svg>
                    </button>
                </article>
                <article className={style.user}>
                    <img src={userSvg} alt="" />
                    <span>Wesley Vargas Borrrero</span>
                    <button
                        title="Start chat with this user"
                        aria-label="Start chat with this user"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                        >
                            <path
                                fill="currentColor"
                                d="M64 0C28.7 0 0 28.7 0 64L0 352c0 35.3 28.7 64 64 64l96 0 0 80c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L309.3 416 448 416c35.3 0 64-28.7 64-64l0-288c0-35.3-28.7-64-64-64L64 0z"
                            />
                        </svg>
                    </button>
                </article>
                <article className={style.user}>
                    <img src={userSvg} alt="" />
                    <span>Wesley Vargas Borrrero</span>
                    <button
                        title="Start chat with this user"
                        aria-label="Start chat with this user"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                        >
                            <path
                                fill="currentColor"
                                d="M64 0C28.7 0 0 28.7 0 64L0 352c0 35.3 28.7 64 64 64l96 0 0 80c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L309.3 416 448 416c35.3 0 64-28.7 64-64l0-288c0-35.3-28.7-64-64-64L64 0z"
                            />
                        </svg>
                    </button>
                </article>
                <article className={style.user}>
                    <img src={userSvg} alt="" />
                    <span>Wesley Vargas Borrrero</span>
                    <button
                        title="Start chat with this user"
                        aria-label="Start chat with this user"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                        >
                            <path
                                fill="currentColor"
                                d="M64 0C28.7 0 0 28.7 0 64L0 352c0 35.3 28.7 64 64 64l96 0 0 80c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L309.3 416 448 416c35.3 0 64-28.7 64-64l0-288c0-35.3-28.7-64-64-64L64 0z"
                            />
                        </svg>
                    </button>
                </article>
            </div>
        </dialog>
    );
}
