const STORAGE_KEY = "mock_chat_data";

function generateId() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

function loadData() {
  if (typeof window === "undefined") return { chats: [], messages: {} };

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return { chats: [], messages: {} };

  try {
    return JSON.parse(raw);
  } catch {
    return { chats: [], messages: {} };
  }
}

function saveData(data) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function notifyDataChange() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("mockChatDataChanged"));
  }
}

export async function getChats(userId) {
  const data = loadData();
  return data.chats.filter((chat) => chat.userId === userId);
}

export async function deleteChat(chatId) {
  const data = loadData();
  data.chats = data.chats.filter((chat) => chat._id !== chatId);
  delete data.messages[chatId];
  saveData(data);
}

export async function createChat(userId, title) {
  const data = loadData();
  const newChat = {
    _id: generateId(),
    userId,
    title: title || "چت جدید",
    createdAt: new Date().toISOString(),
  };

  data.chats.push(newChat);
  data.messages[newChat._id] = [];
  saveData(data);
  notifyDataChange();

  return newChat;
}

export async function addMessage(chatId, role, content) {
  if (!chatId || !content) return;

  const data = loadData();
  if (!data.messages[chatId]) {
    data.messages[chatId] = [];
  }

  data.messages[chatId].push({ role, content, createdAt: new Date().toISOString() });
  saveData(data);
  notifyDataChange();
}

export async function getMessages(chatId) {
  const data = loadData();
  return data.messages[chatId] || [];
}

