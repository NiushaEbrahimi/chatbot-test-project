import axios from "axios";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import ChatMessages from "./ChatMessages.jsx";
import { useParams } from "react-router-dom";

function Chat({userId}){

    const {chatId} = useParams();
    const [value,setValue] = useState("");
    const [chatIdURL, setChatIdURL] = useState(chatId || "");

    const API_BASE = "http://localhost:5000";

    async function createChat(userId, title) {
        try {
            const res = await axios.post(`${API_BASE}/chats`, {
                userId,
                title,
            });
            const data = res.data;
            console.log("Chat created:", data);
            setChatIdURL(data._id);
            return data;
        } catch (err) {
            console.error("Error creating chat:", err);
        }
  }

    async function handleSend(e){
        e.preventDefault()

        if(!chatId){
            const chatData = await createChat(userId, value); 
            if (chatData && chatData._id) {
                await addMessage(chatData._id, "user", value);
                setChatIdURL(chatData._id);
            }
        }else{
            addMessage(chatId, "user", value)
        }
        setValue("")
        console.log("it's working")
    }

    async function addMessage(chatId, role, content) {
        try {
            const res = await axios.post(`${API_BASE}/chats/${chatId}/messages`, {
                role,
                content,
            });
            console.log("Message added:", res.data);
        } catch (err) {
            console.error("Error adding message:", err);
        }
    }

    return(
        <>
           <div className="chat-display">
                <ChatMessages chatId={chatIdURL}/>
           </div>
           <div className="input-container">
                <form onSubmit={(e)=>handleSend(e)}>
                    <button type="submit"><FontAwesomeIcon icon={faPaperPlane} /></button>
                    <input type="text" placeholder='سوالت را بپرس ...' value={value} onChange={(e)=>{
                        setValue(e.target.value)
                    }}/>
                </form>
           </div>
        </>
    )
};

export default Chat;