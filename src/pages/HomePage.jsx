import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import style from '../stylesheets/HomePage.module.css';
import Navigation from '../components/Navigation';
import Loader from '../components/Loader';
import hamburgerSvg from '../assets/svgs/hamburger.svg';
import userSvg from '../assets/svgs/user.svg';
import { NavLink } from 'react-router-dom';
import ChatList from '../components/ChatList';
import Chat from '../components/Chat';
import ResizeableTextarea from '../components/ResizeableTextarea';
import planeSvg from '../assets/svgs/paperplane.svg';
export default function HomePage() {
    const [text, setText] = useState('');
    return (
        <div className={style.page}>
            <header className={style.header}>
                <div>Chatia</div>
                <Navigation />
            </header>
            <main className={style.main}>
                <ChatList />
                <section className={style.chat} aria-label="Chat">
                    <header>
                        <img className={style.user} src={userSvg} alt="" />
                        <h2 className={style.username}>
                            Rose Vargas Hernandez
                        </h2>
                    </header>
                    <section className={style.messageList}>
                        {/* <article className={style.message}>
                            <div className={style.bubble}>
                                <p className={style.text}>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Incidunt tenetur quaerat
                                    consequatur eaque eligendi excepturi atque
                                    beatae, modi officiis distinctio voluptate
                                    similique recusandae temporibus nihil sint
                                    dolores quod nostrum totam.
                                </p>
                            </div>

                            <img
                                className={style.userImage}
                                src={userSvg}
                                alt="User image"
                            />
                        </article>
                        <article data-reverse={true} className={style.message}>
                            <div className={style.bubble}>
                                <p className={style.text}>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Incidunt tenetur quaerat
                                    consequatur eaque eligendi excepturi atque
                                    beatae, modi officiis distinctio voluptate
                                    similique recusandae temporibus nihil sint
                                    dolores quod nostrum totam.
                                </p>
                            </div>
                            <img
                                className={style.userImage}
                                src={userSvg}
                                alt="User image"
                            />
                        </article>
                        <article className={style.message}>
                            <div className={style.bubble}>
                                <p className={style.text}>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Incidunt tenetur quaerat
                                    consequatur eaque eligendi excepturi atque
                                    beatae, modi officiis distinctio voluptate
                                    similique recusandae temporibus nihil sint
                                    dolores quod nostrum totam.
                                </p>
                            </div>

                            <img
                                className={style.userImage}
                                src={userSvg}
                                alt="User image"
                            />
                        </article>
                        <article data-reverse={true} className={style.message}>
                            <div className={style.bubble}>
                                <p className={style.text}>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Incidunt tenetur quaerat
                                    consequatur eaque eligendi excepturi atque
                                    beatae, modi officiis distinctio voluptate
                                    similique recusandae temporibus nihil sint
                                    dolores quod nostrum totam.
                                </p>
                            </div>
                            <img
                                className={style.userImage}
                                src={userSvg}
                                alt="User image"
                            />
                        </article>
                        <article className={style.message}>
                            <div className={style.bubble}>
                                <p className={style.text}>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Incidunt tenetur quaerat
                                    consequatur eaque eligendi excepturi atque
                                    beatae, modi officiis distinctio voluptate
                                    similique recusandae temporibus nihil sint
                                    dolores quod nostrum totam.
                                </p>
                            </div>

                            <img
                                className={style.userImage}
                                src={userSvg}
                                alt="User image"
                            />
                        </article> */}
                        <article data-reverse={true} className={style.message}>
                            <div className={style.bubble}>
                                <p className={style.text}>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Incidunt tenetur quaerat
                                    consequatur eaque eligendi excepturi atque
                                    beatae, modi officiis distinctio voluptate
                                    similique recusandae temporibus nihil sint
                                    dolores quod nostrum totam.
                                </p>
                            </div>
                            <img
                                className={style.userImage}
                                src={userSvg}
                                alt="User image"
                            />
                        </article>
                    </section>
                    <form
                        className={style.sendMessage}
                        style={{
                            position: 'relative',
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
            </main>
        </div>
    );
}
