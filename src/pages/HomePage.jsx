import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import style from '../stylesheets/HomePage.module.css';
import Navigation from '../components/Navigation';
import Loader from '../components/Loader';
import hamburgerSvg from '../assets/svgs/hamburger.svg';
import userSvg from '../assets/svgs/user.svg';
import { NavLink } from 'react-router-dom';
import ChatItem from '../components/ChatItem';
import planeSvg from '../assets/svgs/paperplane.svg';
export default function HomePage() {
    const [text, setText] = useState('');
    const [rows, setRows] = useState(1);
    const spanRef = useRef(null);
    const textareaRef = useRef(null);
    const [span, setSpan] = useState({ width: '0', fontSize: 0, height: 0 });
    const [dimen, setDimen] = useState({
        offsetHeight: 0,
        scrollheight: 0,
    });
    useEffect(() => {
        const ta = textareaRef?.current;
        const spanClone = structuredClone(span);
        span.width = window
            .getComputedStyle(ta, null)
            .getPropertyValue('width');

        console.log(
            window.getComputedStyle(ta, null).getPropertyValue('width')
        );
        setSpan(span);
        setDimen({
            offsetHeight: ta.offsetHeight,
            scrollHeight: ta.scrollHeight,
        });
    }, []);

    useEffect(() => {
        const virutalTextarea = spanRef?.current;
        const lineHeight = window
            .getComputedStyle(virutalTextarea, null)
            .getPropertyValue('line-height');
        console.log('total lines or rows');
        const lines =
            Math.ceil(virutalTextarea.scrollHeight / parseInt(lineHeight)) - 1;
        console.log(
            Math.ceil(virutalTextarea.scrollHeight / parseInt(lineHeight) - 1)
        );
        // TODO: Need to adapt this so when screen changes it recalculates the lines again
        // and adjusts the rows depending on the change
        if (lines !== rows) {
            setRows(lines);
            console.log('lines  are not are not equal');
        }
    }, [text]);

    useEffect(() => {
        // const ta = textareaRef?.current;
        // console.log('offsetHeight');
        // console.log(ta.offsetHeight);
        // console.log('scrollheight');
        // console.log(ta.scrollHeight / 24);
        // setRows(3);
    }, [rows]);
    return (
        <div className={style.page}>
            <header className={style.header}>
                <div>Chatia</div>
                <nav className={style.navigation}>
                    <NavLink className={style.navLink}>
                        <div className={style.content}>
                            <svg
                                className={style.navIcon}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                            >
                                <path
                                    fill="currentColor"
                                    d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
                                />
                            </svg>
                            <span className={style.text}>Profile</span>
                        </div>
                    </NavLink>
                    <NavLink className={style.navLink}>
                        <div className={style.content}>
                            <svg
                                className={style.navIcon}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 576 512"
                            >
                                <path
                                    fill="currentColor"
                                    d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"
                                />
                            </svg>
                            <span className={style.text}>Home</span>
                        </div>
                    </NavLink>
                    <NavLink className={style.navLink}>
                        <div className={style.content}>
                            <svg
                                className={style.navIcon}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 640 512"
                            >
                                <path
                                    fill="currentColor"
                                    d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192l42.7 0c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0L21.3 320C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7l42.7 0C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3l-213.3 0zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352l117.3 0C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7l-330.7 0c-14.7 0-26.7-11.9-26.7-26.7z"
                                />
                            </svg>
                            <span className={style.text}>Users</span>
                        </div>
                    </NavLink>
                </nav>
            </header>
            <main className={style.main}>
                <section className={style.chats} aria-label="Chats">
                    <ChatItem delayAnim={'.2s'}></ChatItem>
                    <ChatItem delayAnim={'.4s'}></ChatItem>
                    <ChatItem delayAnim={'.8s'}></ChatItem>
                    <ChatItem delayAnim={'1.2s'}></ChatItem>
                    <ChatItem delayAnim={'1.6s'}></ChatItem>
                    <ChatItem delayAnim={'2s'}></ChatItem>
                    <ChatItem delayAnim={'2.4s'}></ChatItem>
                    <ChatItem delayAnim={'2.8s'}></ChatItem>
                    <ChatItem delayAnim={'3.2s'}></ChatItem>
                    <ChatItem delayAnim={'3.6s'}></ChatItem>
                </section>
                <section className={style.chat} aria-label="Chat">
                    <header>
                        <img className={style.user} src={userSvg} alt="" />
                        <h2 className={style.username}>
                            Rose Vargas Hernandez
                        </h2>
                    </header>
                    <section className={style.messageList}>
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
                    </section>
                    <form
                        className={style.sendMessage}
                        style={{
                            position: 'relative',
                        }}
                    >
                        <textarea
                            ref={textareaRef}
                            rows={rows}
                            value={text}
                            aria-label="Enter message"
                            className={'primary'}
                            name="text"
                            id="text"
                            placeholder="Enter message to Rose"
                            onChange={(e) => {
                                setText(e.target.value);
                                const ta = e.target;
                                ta.style.rows = 1;

                                console.log('offsetHeight');
                                console.log(ta.offsetHeight);
                                console.log('scrollheight');
                                console.log(ta.scrollHeight);
                                // setRows(1);
                                // const defaultHeight = parseInt(
                                //     window
                                //         .getComputedStyle(textarea, null)
                                //         .getPropertyValue('height')
                                // );
                                // console.log(defaultHeight);
                                // let height = textarea.offsetHeight;
                                // const textareaScrollHeight =
                                //     textarea.scrollHeight;
                                // const lineHeight = window
                                //     .getComputedStyle(textarea, null)
                                //     .getPropertyValue('line-height');
                                // console.log(
                                //     window
                                //         .getComputedStyle(textarea, null)
                                //         .getPropertyValue('height')
                                // );

                                // setRows(
                                //     () =>
                                //         parseInt(
                                //             Math.ceil(
                                //                 textareaScrollHeight /
                                //                     parseInt(lineHeight)
                                //             )
                                //         ) - 1
                                // );
                                // console.log(textareaHeight);
                                // console.log(textareaScrollHeight);
                                //                                 console.log(
                                //                                     parseInt(
                                //                                         Math.ceil(
                                //                                             textareaScrollHeight /
                                //                                                 parseInt(lineHeight)
                                //                                         )
                                //                                     ) - 1
                                //                                 );
                                //                                 if (height >= textareaScrollHeight) {
                                //                                     textarea.style.height =
                                //                                         height + parseInt(lineHeight) + 'px';
                                //
                                //                                     console.log('height is greater ');
                                //                                     if (
                                //                                         textareaScrollHeight <
                                //                                         textarea.scrollHeight
                                //                                     ) {
                                //                                         console.log('inner if');
                                //                                         while (
                                //                                             textarea.offsetHeight >=
                                //                                             textarea.scrollHeight
                                //                                         ) {
                                //                                             console.log('running first while');
                                //                                             textarea.style.height =
                                //                                                 (height -=
                                //                                                     parseInt(lineHeight)) +
                                //                                                 'px';
                                //                                         }
                                //                                         while (
                                //                                             textarea.offsetHeight <
                                //                                             textarea.scrollHeight
                                //                                         ) {
                                //                                             console.log('running second while');
                                //                                             textarea.style.height =
                                //                                                 height++ + 'px';
                                //                                         }
                                //
                                //                                         // console.log(textareaHeight);
                                //
                                //                                         setRows(
                                //                                             Math.ceil(
                                //                                                 height / parseInt(lineHeight)
                                //                                             )
                                //                                         );
                                //                                     }
                                //                                 } else {
                                //                                     console.log('else running');
                                //                                     console.log(
                                //                                         'total lines are: ' +
                                //                                             Math.ceil(height / 24)
                                //                                     );
                                //                                 }
                            }}
                        ></textarea>
                        <button
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

                        <textarea
                            ref={spanRef}
                            className="primary"
                            aria-hidden={true}
                            rows={1}
                            style={{
                                visibility: 'hidden',
                                zIndex: -1,
                                width: span.width,
                                position: 'absolute',
                                top: '-250px',
                            }}
                            value={text}
                            readOnly
                        ></textarea>
                    </form>
                </section>
            </main>
        </div>
    );
}
