'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("이메일:", email);
    console.log("비밀번호:", password);
  };

  const goToSignUp = () => {
    router.push('/signup');
  };

  return (
    <div className="container">
      <h1>밍챗</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="input-field"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="input-field"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="button-primary">로그인</button>
        <button type="button" className="button-primary" onClick={goToSignUp}>회원가입</button>
      </form>
    </div>
  );
}
