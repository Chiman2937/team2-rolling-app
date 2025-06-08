// src/components/Slider/Slider.jsx
import { useState, useRef, useEffect } from 'react';
import styles from './Slider.module.scss';
import ItemCard from './ItemCard';
import ArrowButton from '../../../components/Button/ArrowButton';
import HorizontalScrollContainer from '../../../components/HorizontalScrollContainer/HorizontalScrollContainer';

const CARD_WIDTH = 275;
const GAP = 16;
const PAGE_SIZE = 4;

export default function Slider({ cards }) {
  const wrapperRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1200);
  const [pageIndex, setPageIndex] = useState(0);

  // 뷰포트 변경 감지
  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 1200);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // 한 번에 스크롤할 픽셀
  const offsetPerPage = PAGE_SIZE * (CARD_WIDTH + GAP);
  const maxIndex = Math.max(0, Math.ceil(cards.length / PAGE_SIZE) - 1);

  // 페이지 이동 로직
  const slideTo = (newIndex) => {
    const el = wrapperRef.current;
    if (!el) return;
    el.scrollTo({ left: newIndex * offsetPerPage, behavior: 'smooth' });
    setPageIndex(newIndex);
  };
  const handlePrev = () => slideTo(Math.max(pageIndex - 1, 0));
  const handleNext = () => slideTo(Math.min(pageIndex + 1, maxIndex));

  // 모바일/태블릿일 때 스크롤하면 pageIndex 동기화
  useEffect(() => {
    if (isDesktop) return;
    const el = wrapperRef.current;
    if (!el) return;
    const onScroll = () => {
      const idx = Math.round(el.scrollLeft / offsetPerPage);
      setPageIndex(Math.min(Math.max(idx, 0), maxIndex));
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [isDesktop, offsetPerPage, maxIndex]);

  // 현재 페이지에 해당하는 카드들 (desktop 페이징용)
  const visibleCards = isDesktop
    ? cards.slice(pageIndex * PAGE_SIZE, pageIndex * PAGE_SIZE + PAGE_SIZE)
    : cards;

  return (
    <div className={styles.slider}>
      {/* 데스크톱에서만 버튼 보이기 */}
      {isDesktop && pageIndex > 0 && (
        <div className={styles['slider__arrow--left']}>
          <ArrowButton direction='left' onClick={handlePrev} />
        </div>
      )}

      {/* 이 wrapper 에 실제 스크롤을 걸어줍니다 */}
      <div ref={wrapperRef} className={styles['slider__container']}>
        <HorizontalScrollContainer>
          <div className={styles['slider__track']}>
            {visibleCards.map((card) => (
              <ItemCard key={card.id} data={card} />
            ))}
          </div>
        </HorizontalScrollContainer>
      </div>

      {isDesktop && pageIndex < maxIndex && (
        <div className={styles['slider__arrow--right']}>
          <ArrowButton direction='right' onClick={handleNext} />
        </div>
      )}
    </div>
  );
}
