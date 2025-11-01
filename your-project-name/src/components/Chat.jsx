import axios from "axios";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import ChatMessages from "./ChatMessages.jsx";

function Chat({userId}){
    const [value,setValue] = useState("")
    const [newChat,setNewChat] = useState(true)
    const [chatId,setChatId] = useState("")
    const API_BASE = "http://localhost:5000";

    async function createChat(userId, title) {
    try {
      const res = await axios.post(`${API_BASE}/chats`, {
        userId,
        title,
      });
      const data = res.data;
      console.log("Chat created:", data);
      setChatId(data._id);
      setNewChat(false);
      return data;
    } catch (err) {
      console.error("Error creating chat:", err);
    }
  }

    async function handleSend(e){
        e.preventDefault()
        // this takes the title of the conversation
        // so it should happen only once
        if(newChat){
            const chatData = await createChat(userId, value); 
            // addMessage(chatId, "user", value)
            console.log(chatData)
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
                <ChatMessages chatId={chatId}/>
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