"use client";
import { useRouter } from "next/navigation";

export default function ChatIntroPage() {
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const creatorId = localStorage.getItem("creatorId");

  const createRoom = async () => {
    const response = await fetch(`${API_URL}/api/rooms/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ creatorId: parseInt(creatorId) }),
    });

    const roomCode = await response.text();
    console.log("방 코드: ", roomCode);

    //일단 방 아이디 저장해두기
    localStorage.setItem('roomCode', roomCode);

    //임시로 상대방에게 알려줄 방 코드 보여주기
    alert(`방 코드: ${roomCode} (상대방에게 공유하세요!)`);

    router.push("/chat");
  };

  const enterRoom = async () => {
    router.push("/enter-room");
  };

  return (
    <div className="container">
      <h1>AI와 함께하는 채팅</h1>
      <div
        style={{
          background: "#f9f9f9",
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "20px",
          margin: "20px 0",
        }}
      >
        AI 상담사와 함께 하는 채팅입니다.
        <br />
        지금 바로 시작해보세요!
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          style={{
            padding: "15px 30px",
            borderRadius: "30px",
            border: "none",
            backgroundColor: "#8B4513",
            color: "white",
            cursor: "pointer",
            fontSize: "16px",
          }}
          onClick={createRoom}
        >
          새로운 채팅 시작하기
        </button>
      </div>
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          style={{
            padding: "15px 30px",
            borderRadius: "30px",
            border: "none",
            backgroundColor: "#8B4513",
            color: "white",
            cursor: "pointer",
            fontSize: "16px",
          }}
          onClick={enterRoom}
        >
          기존 채팅 입장하기
        </button>
      </div>
    </div>
  );
}
