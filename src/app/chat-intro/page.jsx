'use client'
import { useRouter } from "next/navigation";

export default function ChatIntroPage() {
  const router = useRouter();

  const startChat = () => {
    router.push('/chat');
  };

  return (
    <div className="container">
      <h1>AI와 함께하는 채팅</h1>
      <div style={{
        background: '#f9f9f9',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        margin: '20px 0'
      }}>
        AI 상담사와 함께 하는 채팅입니다.<br/>
        지금 바로 시작해보세요!
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button 
          style={{
            padding: '15px 30px',
            borderRadius: '30px',
            border: 'none',
            backgroundColor: '#8B4513',
            color: 'white',
            cursor: 'pointer',
            fontSize: '16px'
          }}
          onClick={startChat}
        >
          채팅 시작하기
        </button>
      </div>
    </div>
  );
}
