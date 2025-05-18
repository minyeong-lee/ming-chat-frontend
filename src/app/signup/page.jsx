"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [nickname, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/members/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            nickname: nickname,
            password: password
        }),
      });

      if (response.ok) {
        alert("회원가입 성공! 로그인 페이지로 이동합니다.");
        router.push("/"); // 로그인 페이지로 이동
      } else {
        alert("회원가입에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
        console.error("에러 발생 : ", error);
      alert("문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  return (
    <div className="container">
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="input-field"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          className="input-field"
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => setNickName(e.target.value)}
        />
        <input
          type="password"
          className="input-field"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          className="input-field"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit" className="button-primary">
          가입하기
        </button>
      </form>
    </div>
  );
}
