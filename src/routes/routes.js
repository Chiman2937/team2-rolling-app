import { lazy } from 'react';
import RollingPaperItemPage from '../pages/RollingPaperItemPage/RollingPaperItemPage';
// 각 페이지의 주소와 컴포넌트를 매핑하는 라우트 설정 파일
// lazy를 사용하면, 컴포넌트가 필요할 때만 불러와서 초기 로딩 속도를 개선할 수 있습니다.

import CreateRollingPaperPage from '@/pages/CreateRollingPaperPage/CreateRollingPaperPage';
const TestPage = lazy(() => import('@/pages/TestPage.jsx'));
const HomePage = lazy(() => import('@/pages/HomePage/HomePage.jsx'));
const ListPage = lazy(() => import('@/pages/ListPage/ListPage.jsx'));



export const routes = [
  // ex: { path: '/post', element: PostPage }, // 게시글 작성 페이지
  //ex2: { path: '/list', element: ListPage },

  { path: '/', element: HomePage },
  // 추가 라우트..
  { path: '/test', element: TestPage },
  { path: '/post', element: CreateRollingPaperPage },
  { path: 'post/:id', element: RollingPaperItemPage }, // 상세 목록 페이지
];
