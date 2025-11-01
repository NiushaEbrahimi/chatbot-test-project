import { useEffect,useState } from "react";
import axios from "axios";

function ChatMessages({chatId}){

    const [messages, setMessages] = useState([]);
    const API_BASE = "http://localhost:5000";

    useEffect(() => {
        if (!chatId) return;
        axios
            .get(`${API_BASE}/chats/${chatId}/messages`)
            .then((res) => {
                setMessages(res.data.messages);
            })
            .catch((err) => {
                console.error("Error fetching messages:", err);
            });
    }, [messages,chatId]);

    return(
        <>
            <div className="chat-messages-container">
                {messages.map((message, index) =>{
                    if(message.role === "user"){
                        return(
                                <div key={index} className="chat-message-container">
                                    <div className="chat-message-content">
                                        {message.content}
                                    </div>
                                </div>
                            )
                    }
                    else{
                        return(
                            <div key={index} className="chat-message-container">
                                <div className="chat-message-content"></div>
                                <div className="chat-message-content">
                                    {message.content}
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
        </>
    )
};

export default ChatMessages;