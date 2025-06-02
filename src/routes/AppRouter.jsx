// src/router/index.jsx
// 라우터를 조합해서 렌더링하는 컴포넌트

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { routes } from './routes';
import { Suspense } from 'react';
import NotFoundPage from '@/pages/NotFoundPage.jsx';
//TODO: 로딩 컴포넌트 추가
function Loading() {
  return <div>Loading…</div>;
}
export default function AppRouter() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* {라우터 배열에서 경로를 탐색함} */}
        {routes.map(({ path, element: Page }) => (
          <Route key={path} path={path} element={<Page />} />
        ))}

        {/* 매칭되는 경로가 없다면 notFound 페이지로 이동 */}
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
