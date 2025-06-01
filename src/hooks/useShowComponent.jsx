import { useLocation } from 'react-router-dom';

/**
 * 경로에 따라 컴포넌트를 보여줄지 여부를 결정하는 커스텀 훅
 * @param {Array} visiblePaths - 버튼을 보여줄 경로들의 배열
 * @returns Boolean - 현재 경로가 버튼을 보여줄 경로인지 여부
 */
export default function useShowComponent(visiblePaths = []) {
  const location = useLocation();
  return visiblePaths.includes(location.pathname);
}
