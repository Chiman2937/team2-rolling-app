// src/components/ErrorFallback.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ErrorFallback({ error, resetErrorBoundary }) {
  const navigate = useNavigate();

  return (
    <div role='alert' style={{ padding: 80, textAlign: 'center' }}>
      <h1>문제가 발생했습니다 🥲</h1>
      <pre style={{ color: 'crimson' }}>{error?.message}</pre>

      <button
        onClick={() => {
          resetErrorBoundary();
          window.location.reload();
        }}
      >
        새로고침
      </button>
      <button
        onClick={() => {
          resetErrorBoundary();
          navigate('/');
        }}
      >
        홈으로
      </button>
    </div>
  );
}
