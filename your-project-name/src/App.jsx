// import { useState } from 'react'
import Chat from "./components/Chat.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentDots } from '@fortawesome/free-regular-svg-icons';
import "./assets/css/main.css";

function App() {
  return (
    <>
      <main>
        <div className="chat-container">
          <header>
            <a href="all-chats">
              <FontAwesomeIcon icon={faCommentDots} color="black"/>
            </a>
            <h4>پشتیبان آنلاین</h4>
          </header>
          <div className="chat-section">
            <Chat/>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
