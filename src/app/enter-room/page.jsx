'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EnterRoomPage() {
  const router = useRouter();
  const [roomCodeInput, setRoomCodeInput] = useState('');

  const handleEnterRoom = () => {
    console.log("입력한 방 코드: ", roomCodeInput);
    // TODO: 서버 검증 요청 예정
    router.push('/chat');
  };

  return (
    <div className="container">
      <h1>기존 채팅 입장하기</h1>
      <input
        type="text"
        placeholder="방 코드 입력"
        value={roomCodeInput}
        onChange={(e) => setRoomCodeInput(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      />
      <button onClick={handleEnterRoom} className="button-primary">
        입장하기
      </button>
    </div>
  );
}
