// src/hooks/useSliderPaging.js
import { useState, useEffect, useMemo, useCallback } from 'react';

export function useSliderPaging({ totalItems, pageSize, breakpoint = 1200 }) {
  // 1) 뷰포트 모드(데스크톱/모바일) 감지
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= breakpoint);
  useEffect(() => {
    const handler = () => setIsDesktop(window.innerWidth >= breakpoint);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, [breakpoint]);

  // 2) 페이지 인덱스 관리
  const [pageIndex, setPageIndex] = useState(0);
  const totalPage = useMemo(
    () => Math.max(0, Math.ceil(totalItems / pageSize) - 1),
    [totalItems, pageSize],
  );

  // 3) 이전/다음 버튼 활성화 여부
  const canPrev = pageIndex > 0;
  const canNext = pageIndex < totalPage;

  // 4) 페이지 이동 함수
  const goPrev = useCallback(() => {
    if (canPrev) setPageIndex((idx) => idx - 1);
  }, [canPrev]);

  const goNext = useCallback(() => {
    if (canNext) setPageIndex((idx) => idx + 1);
  }, [canNext]);

  return { isDesktop, pageIndex, totalPage, canPrev, canNext, goPrev, goNext };
}
