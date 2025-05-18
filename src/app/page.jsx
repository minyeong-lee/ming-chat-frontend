"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  console.log("API URL: ", API_URL);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      email: email,
      password: password,
    };

    console.log("이메일:", email);
    console.log("비밀번호:", password);

    try {
      const response = await fetch(`${API_URL}/api/members/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (response.ok) {
        const data = await response.json(); //응답 JSON 파싱 (이거 안 쓰면 undefined)
        localStorage.setItem('creatorId', data.id)
        alert('로그인 성공! 채팅방으로 이동합니다.')
        router.push('/main');
      } else {
        alert('로그인 실패! 이메일이나 비밀번호를 확인해 주세요.')
      }

    } catch(error) {
      console.error("에러 발생: ", error);
      alert("문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  const goToSignUp = () => {
    router.push("/signup");
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
        <button type="submit" className="button-primary">
          로그인
        </button>
        <button type="button" className="button-primary" onClick={goToSignUp}>
          회원가입
        </button>
      </form>
    </div>
  );
}
