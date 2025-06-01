// src/pages/NotFoundPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    // TODO: BEM 및 scss 모듈 적용
    <div style={{ textAlign: 'center', padding: '80px 20px' }}>
      <h1>404</h1>
      <p>페이지를 찾을 수 없습니다.</p>
      <button onClick={() => navigate('/')}>홈으로 돌아가기</button>
    </div>
  );
}
