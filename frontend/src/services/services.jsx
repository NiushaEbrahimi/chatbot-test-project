import axios from "axios";

const API_BASE = "http://localhost:5000";

export async function getChats(userId) {
  const res = await axios.get(`${API_BASE}/chats`, {
    params: { userId },
  });

  return res.data;
}

export async function deleteChat(chatId) {
  await axios.delete(`${API_BASE}/chats/${chatId}`);
}

export async function createChat(userId, title) {
    const res = await axios.post(`${API_BASE}/chats`, { userId, title });
    return res.data;
}

export async function addMessage(chatId, role, content) {
    try {
        await axios.post(`${API_BASE}/chats/${chatId}/messages`, { role, content });
    } catch (err) {
        console.error("Error adding message:", err);
    }
}

