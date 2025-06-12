// src/pages/NotFoundPage.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';
import Button from '@/components/Button/Button';
export default function NotFoundPage() {
  const navigate = useNavigate();
  //현재 경로 불러오기
  const currentPath = useLocation().pathname;
  return (
    // @todo: BEM 및 scss 모듈 적용
    <div className={styles['not-found-page']}>
      <h1 className={styles['not-found-page__title']}>404</h1>
      <h3 className={styles['not-found-page__subtitle']}>
        <span className={styles['not-found-page__path']}> '{currentPath}'</span> 경로를 찾을 수
        없습니다.
      </h3>
      <div className={styles['not-found-page__message']}>
        <p>요청하신 페이지가 존재하지 않습니다.</p>
        <p>입력하신 경로가 올바른지 확인해 주세요.</p>
      </div>
      <Button onClick={() => navigate('/')}>홈으로 돌아가기</Button>
    </div>
  );
}
