// src/components/HorizontalScrollContainer/HorizontalScrollContainer.jsx

import React, { useRef, useEffect } from 'react';
import styles from './HorizontalScrollContainer.module.scss';

/**
 * HorizontalScrollContainer
 *
 * - 자식(children)을 flex-nowrap 컨테이너로 감싸고,
 * - 내부에서 wheel 이벤트를 받아서 세로 스크롤을 막고 가로 스크롤로 전환합니다.
 *
 * @param {{
 *   children: React.ReactNode,
 *   className?: string,          // 추가적인 클래스 네임 (선택)
 *   style?: React.CSSProperties, // inline style (선택)
 * }} props
 */
export default function HorizontalScrollContainer({ children, className = '', style = {} }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onWheel = (e) => {
      // 가로 스크롤 영역 내에서 휠 이벤트가 발생하면, 기본 세로 스크롤 차단
      e.preventDefault();
      // deltaY 값을 이용해 가로 스크롤을 수행
      container.scrollLeft += e.deltaY;
    };

    // passive: false 로 등록해야 preventDefault()가 먹습니다.
    container.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', onWheel);
    };
  }, []);

  return (
    <div ref={containerRef} className={`${styles['horizontal-scroll']} ${className}`} style={style}>
      {children}
    </div>
  );
}
