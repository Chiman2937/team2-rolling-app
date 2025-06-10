// src/hooks/useSliderPaging.js
import { useState, useRef, useEffect, useCallback } from 'react';

export function useSliderPaging({ totalItems, pageSize, cardWidth, gap, breakpoint = 1200 }) {
  const wrapperRef = useRef(null);

  // 1) 뷰포트가 데스크톱 모드인지
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= breakpoint);
  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= breakpoint);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [breakpoint]);

  // 2) 페이지 인덱스
  const [pageIndex, setPageIndex] = useState(0);
  const totalPage = Math.max(0, Math.ceil(totalItems / pageSize) - 1);

  // 3) 한 페이지당 스크롤 픽셀
  const offset = pageSize * (cardWidth + gap);

  // 4) 데스크톱: 버튼 클릭 시 페이지 이동
  const slideTo = useCallback(
    (idx) => {
      const el = wrapperRef.current;
      if (!el) return;
      el.scrollTo({ left: idx * offset, behavior: 'smooth' });
      setPageIndex(idx);
    },
    [offset],
  );

  const canPrev = pageIndex > 0;
  const canNext = pageIndex < totalPage;
  const goPrev = () => canPrev && slideTo(pageIndex - 1);
  const goNext = () => canNext && slideTo(pageIndex + 1);

  return {
    wrapperRef,
    isDesktop,
    pageIndex,
    canPrev,
    canNext,
    goPrev,
    goNext,
    totalPage,
  };
}
