"use client";
import { useState, useEffect } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [userId, setUserId] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const code = localStorage.getItem("roomCode");
    const user = localStorage.getItem("creatorId");
    setRoomCode(code);
    setUserId(user);
  }, []);

  const fetchMessages = async () => {
    if (!roomCode) return;
    const response = await fetch(`${API_URL}/api/chat/${roomCode}`);
    const data = await response.json();
    setMessages(data);
  };

  useEffect(() => {
    fetchMessages();
    const intervalId = setInterval(fetchMessages, 500);
    return () => clearInterval(intervalId);
  }, [roomCode]);

  const handleSend = async () => {
    if (!input.trim() || !roomCode || !userId) return;

    const response = await fetch(`${API_URL}/api/chat/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        roomCode,
        senderId: parseInt(userId),
        message: input,
      }),
    });

    const savedMessage = await response.json();
    console.log("서버가 저장한 메시지: ", savedMessage);

    setMessages([...messages, savedMessage]);
    setInput("");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          backgroundColor: "#fff",
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          height: "80vh",
        }}
      >
        <header
          style={{
            padding: "15px",
            borderBottom: "1px solid #ddd",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          밍챗 대화방
        </header>

        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "15px",
            backgroundColor: "#f9f9f9",
          }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                margin: "10px 0",
                display: "flex",
                justifyContent:
                  msg.senderId === parseInt(userId) ? "flex-end" : "flex-start",
              }}
            >
              <div
                style={{
                  maxWidth: "70%",
                  padding: "10px 15px",
                  borderRadius: "15px",
                  backgroundColor:
                    msg.senderId === parseInt(userId) ? "#8B4513" : "#e0e0e0",
                  color: msg.senderId === parseInt(userId) ? "#fff" : "#000",
                }}
              >
                {msg.message}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            borderTop: "1px solid #ddd",
            padding: "10px",
            backgroundColor: "#fff",
          }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="메시지를 입력하세요"
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ddd",
              marginRight: "10px",
            }}
          />
          <button
            onClick={handleSend}
            style={{
              padding: "10px 20px",
              borderRadius: "6px",
              backgroundColor: "#8B4513",
              color: "white",
              border: "none",
            }}
          >
            보내기
          </button>
        </div>
      </div>
    </div>
  );
}
