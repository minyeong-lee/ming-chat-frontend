'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EnterRoomPage() {
  const router = useRouter();
  const [roomCode, setRoomCode] = useState('');
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const userId = localStorage.getItem('creatorId');

  const handleEnterRoom = async () => {
    console.log('버튼 클릭됨: ', roomCode)
    const response = await fetch(`${API_URL}/api/rooms/enter`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ roomCode, userId: parseInt(userId) }),
    });

    if (response.ok) {
      localStorage.setItem('roomCode', roomCode);
      alert('입장 성공! 채팅방으로 이동합니다.');
      router.push('/chat');
    } else {
      alert('입장 실패! 방 코드를 확인해주세요.');
    }
  };

  return (
    <div className="container">
      <h1>기존 채팅 입장하기</h1>
      <input
        type="text"
        placeholder="방 코드 입력"
        value={roomCode}
        onChange={(e) => setRoomCode(e.target.value)}
        style={{ width: '95%', padding: '10px', marginBottom: '10px' }}
      />
      <button onClick={handleEnterRoom} className="button-primary">
        입장하기
      </button>
    </div>
  );
}
