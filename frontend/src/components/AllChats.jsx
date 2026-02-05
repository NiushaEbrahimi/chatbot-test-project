import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getChats, deleteChat } from "../services/chatService";

function AllChats({ userId }) {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    if (!userId) return;

    const fetchChats = async () => {
      try {
        const data = await getChats(userId);
        setChats(data);
      } catch (err) {
        console.error("Error fetching chats:", err);
      }
    };

    fetchChats();
  }, [userId]);

  const handleDelete = async (chatId) => {
    try {
      await deleteChat(chatId);

      setChats((prev) => prev.filter((chat) => chat._id !== chatId));
    } catch (err) {
      console.error("Error deleting chat:", err);
    }
  };

  return (
    <main className="main-all-chats">
      <h3>تمام چت‌ها</h3>

      <Link to={`/`} className="create-link">
        <button>+ ایجاد صفحه چت جدید</button>
      </Link>

      <div className="list-container">
        <ul>
          {chats.map((chat) => (
            <li key={chat._id} className="chat-item">
              <Link to={`/chat/${chat._id}`}>{chat.title}</Link>

              <button
                className="delete-btn"
                onClick={() => handleDelete(chat._id)}
              >
                delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default AllChats;
