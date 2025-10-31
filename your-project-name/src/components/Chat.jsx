// import axios from "axios";
// import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';

function Chat(){
    // const [messages, setMessages] = useState([]);
    // const [message, setMessage] = useState("");
    // const [name, setName] = useState("");

    // const getMessages = async () => {
    //     const response = await axios.get("http://localhost:3000/messages");
    //     setMessages(response.data);
    // };

    // const sendMessage = async (event) => {
    //     event.preventDefault();
    //     const response = await axios.post("http://localhost:3000/messages", {
    //         name: name,
    //         message: message,
    //     });
    //     setMessages([...messages, response.data]);
    //     setMessage("");
    // };
    function handleSend(e){
        e.preventDefault()
    }
    return(
        <>
           <div className="chat-display">hlelo</div>
           <div className="input-container">
                <form onSubmit={(e)=>handleSend(e)}>
                    <button type="submit"><FontAwesomeIcon icon={faPaperPlane} /></button>
                    <input type="text" />
                </form>
           </div>
        </>
    )
};

export default Chat;