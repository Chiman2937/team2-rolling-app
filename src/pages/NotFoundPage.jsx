// src/pages/NotFoundPage.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();
  //현재 경로 불러오기
  const currentPath = useLocation().pathname;
  return (
    // @todo: BEM 및 scss 모듈 적용
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '80px 20px',
        gap: '20px',
      }}
    >
      <h1>404</h1>
      <h1>'{currentPath}'경로를 찾을 수 없습니다.</h1>
      <p>요청하신 페이지가 존재하지 않습니다.</p>
      <button onClick={() => navigate('/')}>홈으로 돌아가기</button>
    </div>
  );
}
