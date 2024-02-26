import Chat from "./Chat";
import chatListStyle from '../stylesheets/chatlist.module.css'
export default function ChatList() {
    return (
        <ul className={chatListStyle.list}>
            <div>
                <h1 className={chatListStyle.title}>Chats</h1>
                {/* <div>
                    Settings
                </div> */}
            </div>
            <Chat />
            <Chat />
            <Chat></Chat>
            <Chat></Chat>
            <Chat></Chat>
            <Chat></Chat>
            <Chat></Chat>
            <Chat></Chat>
            <Chat></Chat>
            <Chat></Chat>
            <Chat></Chat>
            <Chat></Chat>
        </ul>
    )
}