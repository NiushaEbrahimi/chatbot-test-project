# 💬 Chat App API — Simple Documentation

A simple Node.js + Express + MongoDB backend for managing chats and messages.

---

## 🔹 1. Create a Chat

**Endpoint:**
```
POST /chats
```

**Body Example (JSON):**
```json
{
  "userId": "123",
  "title": "My First Chat"
}
```

**Response Example:**
```json
{
  "_id": "672cb2b19f1a1c2a7b1a9d8e",
  "userId": "123",
  "title": "My First Chat",
  "createdAt": "2025-11-01T10:00:00Z"
}
```

---

## 🔹 2. Get All Chats for a User

**Endpoint:**
```
GET /chats?userId=USER_ID
```

**Example:**
```
GET /chats?userId=123
```

**Response Example:**
```json
[
  {
    "_id": "672cb2b19f1a1c2a7b1a9d8e",
    "title": "My First Chat",
    "userId": "123",
    "createdAt": "2025-11-01T10:00:00Z"
  },
  {
    "_id": "672cb2f29f1a1c2a7b1a9d90",
    "title": "Another Chat",
    "userId": "123",
    "createdAt": "2025-11-01T11:00:00Z"
  }
]
```

---

## 🔹 3. Add Message to a Chat

**Endpoint:**
```
POST /chats/:chatId/messages
```

**Body Example (JSON):**
```json
{
  "role": "user",
  "content": "Hello, how are you?"
}
```

**Response Example:**
```json
{
  "_id": "672cb2b19f1a1c2a7b1a9d8e",
  "title": "My First Chat",
  "messages": [
    {
      "_id": "672cb3019f1a1c2a7b1a9d92",
      "role": "user",
      "content": "Hello, how are you?",
      "timestamp": "2025-11-01T10:05:00Z"
    }
  ]
}
```

---

## 🔹 4. Get Messages for a Chat

**Endpoint:**
```
GET /chats/:chatId/messages
```

**Response Example:**
```json
{
  "chatId": "672cb2b19f1a1c2a7b1a9d8e",
  "title": "My First Chat",
  "messages": [
    {
      "role": "user",
      "content": "Hello!",
      "timestamp": "2025-11-01T10:00:00Z"
    },
    {
      "role": "assistant",
      "content": "Hi there! How can I help you today?",
      "timestamp": "2025-11-01T10:01:00Z"
    }
  ]
}
```

---

## 🔹 5. Delete a Chat

**Endpoint:**
```
DELETE /chats/:chatId
```

**Example:**
```
DELETE /chats/672cb2b19f1a1c2a7b1a9d8e
```

**Response Example:**
```json
{
  "success": true
}
```

---

## ⚙️ Tech Stack

- **Backend:** Node.js + Express  
- **Database:** MongoDB (Mongoose)  
- **CORS:** Enabled  
- **Port:** `5000`

---

## 🧠 Notes

- Each **user** can have multiple **chats**.  
- Each **chat** has its own **messages list**.  
- Each message contains:
  - `role` → who sent it (`user` or `assistant`)
  - `content` → the text
  - `timestamp` → auto-generated date/time

---

**Made with ❤️ using Node.js and MongoDB**
