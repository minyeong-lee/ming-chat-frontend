"use client";
import { useRouter } from "next/navigation";

export default function Main() {
  const router = useRouter();

  return (
    <div className="container">
      <h1>환영합니다!</h1>
      <p style={{
        fontSize: '18px',
        margin: '20px 0',
        padding: '15px',
        background: '#f9f9f9',
        border: '1px solid #ddd',
        borderRadius: '8px'
      }}>
        "진짜 사랑은 서로를 바라보는 것이 아니라<br/>
        같은 방향을 바라보는 것이다."
      </p>
      <p>오늘도 AI 상담사와 함께 건강한 소통을 시작해보세요!</p>

      {/* 하단 탭바 */}
      <div className="tab-bar">
        <div className="tab-item" onClick={() => router.push('/main')}>🏠 홈</div>
        <div className="tab-item" onClick={() => router.push('/chat-intro')}>💬 채팅 시작</div>
        <div className="tab-item" onClick={() => alert('아직 준비 중입니다.')}>📄 내 기록</div>
      </div>
    </div>
  );
}
