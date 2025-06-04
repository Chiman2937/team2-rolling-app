import { useState, useEffect, useRef } from 'react';
import styles from './Slider.module.scss';
import ItemCard from './ItemCard';
const Slider = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);
  const containerRef = useRef(null);

  // PC vs. Tablet/Mobile 판별 (PC는 window.innerWidth ≥ 1200)
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsDesktop(width >= 1200);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const cardsPerPage = 4;
  const maxIndex = Math.max(0, Math.ceil(cards.length / cardsPerPage) - 1);

  const handlePrev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));
  const handleNext = () => setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));

  // PC 모드일 때만 4개씩 슬라이스
  const start = currentIndex * cardsPerPage;
  const end = start + cardsPerPage;
  const cardsToRender = isDesktop && cards.length > cardsPerPage ? cards.slice(start, end) : cards;

  return (
    <div className={styles['slider']}>
      {isDesktop && cards.length > cardsPerPage && currentIndex > 0 && (
        <button className={styles['slider__arrow--left']} onClick={handlePrev}>
          ◀
        </button>
      )}

      <div className={styles['slider__container']} ref={containerRef}>
        <div className={styles['slider__track']}>
          {cardsToRender.map((card, idx) => (
            // key에 card.id와 idx를 조합해서 중복 없는 문자열로 만듭니다.
            <ItemCard key={`${card.id}-${idx}`} data={card} />
          ))}
        </div>
      </div>

      {isDesktop && cards.length > cardsPerPage && currentIndex < maxIndex && (
        <button className={styles['slider__arrow--right']} onClick={handleNext}>
          ▶
        </button>
      )}
    </div>
  );
};

export default Slider;
