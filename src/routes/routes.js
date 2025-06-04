import { lazy } from 'react';
import RollingPaperItemPage from '../pages/RollingPaperItemPage/RollingPaperItemPage';
// 각 페이지의 주소와 컴포넌트를 매핑하는 라우트 설정 파일
// lazy를 사용하면, 컴포넌트가 필요할 때만 불러와서 초기 로딩 속도를 개선할 수 있습니다.

const PostHeaderTestPage = lazy(() => import('@/pages/PostHeaderTestPage.jsx'));
const TestPage = lazy(() => import('@/pages/TestPage.jsx'));
import CreateRollingPaperPage from '@/pages/CreateRollingPaperPage/CreateRollingPaperPage';

//ex): const PostPage = lazy(() => import('@/pages/PostPage/PostPage.jsx'));
export const routes = [
  { path: '/post', element: CreateRollingPaperPage },
  // ex: { path: '/post', element: PostPage }, // 게시글 작성 페이지
  //ex2: { path: '/list', element: ListPage },
  { path: '/testHeader', element: PostHeaderTestPage }, // 테스트용 헤더 페이지
  { path: '/', element: TestPage },
  // 추가 라우트..
  { path: 'post/:id', element: RollingPaperItemPage }, // 상세 목록 페이지
];
