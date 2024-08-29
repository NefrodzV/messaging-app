import { useParams, useLocation } from 'react-router-dom';
import chatStyle from '../stylesheets/Chat.module.css';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import ResizeableTextarea from '../components/ResizeableTextarea';
export default function Chat() {
    // const { state } = useLocation()
    // const { id } = useParams()
    // const { token } = useContext(UserContext)
    // const [user, setUser] = useState(null)
    // const { data, loading, error, update, create } = useChat(id, user)
    // const [messages, setMessages] = useState([])
    // const [sentMessage, setSentMessage] =  useState(null)
    // const [sentMessageIsLoading, setSentMessageIsLoading] = useState(false)
    // data of the response of the message sent
    // errors of the response when sending the message
    // const [sentMessageError, setSentMessageError] = useState(null)
    // State from a location changed example /chats/create
    // useEffect(() =>{
    //     if(!state) return
    //     setUser({...state.user})
    // },[state])
    //
    // useEffect(() => {
    //     if(!data) return
    //     setMessages([ ...data.messages ])
    //     // If the user is not defined the set it
    //     if(!user) setUser({...data.user })
    // },[data])

    // useEffect(() => {
    //     if(!id) return
    //     update()
    // },[id,sentMessage, update])

    // Sends message to api
    // async function sendMessage(message) {
    //     try {
    //         // setSentMessageIsLoading(true)
    //         const body = {
    //             message: message
    //         }
    //         const response = await fetch(
    //             `https://messaging-api.adaptable.app/api/messages?chatId=${id}`,
    //             {
    //                 method: "POST",
    //                 headers:{
    //                     "authorization": "Bearer " + token,
    //                     "content-type": "application/json"
    //                 },
    //                 body: JSON.stringify(body)
    //             }
    //         )
    //         const json = await response.json()
    //         if(!response.ok) {
    //             // setSentMessageError(json.errors)
    //             return
    //         }
    //         setSentMessage(json)
    //     } catch(e) {
    //         // setSentMessageError("Some error happened sending message:" + e)
    //     } finally {
    //         // setSentMessageIsLoading(false)
    //     }
    // }

    // function sendMessageHandler(e) {
    //     e.preventDefault()
    //     const message = e.target["message"].value
    //     if(!message.trim()) {
    //         return
    //     }
    //     /** If there is id param send a message if not
    //      * create a chat with a message sent*/
    //     if(!id) {
    //         create(message)
    //     } else {
    //         sendMessage(message)
    //         update()
    //     }
    //     e.target.reset()
    // }

    if (error) return <div>Whoops something went wrong</div>;
    return (
        <section className={style.chat} aria-label="Chat">
            <header>
                <img className={style.user} src={userSvg} alt="" />
                <h2 className={style.username}>Rose Vargas Hernandez</h2>
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
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Incidunt tenetur quaerat consequatur eaque
                            eligendi excepturi atque beatae, modi officiis
                            distinctio voluptate similique recusandae temporibus
                            nihil sint dolores quod nostrum totam.
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
    );
}
