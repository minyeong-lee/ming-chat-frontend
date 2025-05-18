"use client";
import { useState } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = { text: input, sender: 'user' };
    setMessages([...messages, newMessage]);
    setInput('');
  };

  return (
    <div className="container">
      <h1>밍챗 대화</h1>

      <div style={{
        height: '400px',
        overflowY: 'auto',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '10px',
        marginBottom: '10px'
      }}>
        {messages.length === 0 && <p>대화를 시작해보세요.</p>}
        {messages.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
            {msg.text}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ flex: 1, padding: '10px', borderRadius: '6px 0 0 6px', border: '1px solid #ddd' }}
        />
        <button onClick={handleSend} style={{ padding: '10px 20px', borderRadius: '0 6px 6px 0', backgroundColor: '#8B4513', color: 'white', border: 'none' }}>
          보내기
        </button>
      </div>
    </div>
  );
}
