// Slider.jsx
import styles from './Slider.module.scss';
import ItemCard from './ItemCard';
import ArrowButton from '@/components/Button/ArrowButton';
import HorizontalScrollContainer from '@/components/HorizontalScrollContainer/HorizontalScrollContainer';
import { useSliderPaging } from '@/hooks/useSliderPaging';

const CARD_WIDTH = 275;
const GAP = 16;
const PAGE_SIZE = 4;

const Slider = ({ cards, onLoadMore, hasMore, loading }) => {
  const { wrapperRef, isDesktop, pageIndex, canPrev, canNext, goPrev, goNext } = useSliderPaging({
    totalItems: cards.length,
    pageSize: PAGE_SIZE,
    cardWidth: CARD_WIDTH,
    gap: GAP,
    breakpoint: 1200,
  });

  const visibleCards = isDesktop
    ? cards.slice(pageIndex * PAGE_SIZE, pageIndex * PAGE_SIZE + PAGE_SIZE)
    : cards;

  const handleNext = () => {
    if (isDesktop && !canNext && hasMore && typeof onLoadMore === 'function') {
      onLoadMore();
    } else {
      goNext();
    }
  };

  return (
    <div className={styles.slider}>
      {isDesktop && canPrev && (
        <div className={styles['slider__arrow--left']}>
          <ArrowButton direction='left' onClick={goPrev} />
        </div>
      )}

      <div ref={wrapperRef} className={styles['slider__container']}>
        <HorizontalScrollContainer>
          <div className={styles['slider__track']}>
            {visibleCards.map((c) => (
              <ItemCard key={c.id} data={c} />
            ))}
          </div>
        </HorizontalScrollContainer>
      </div>

      {isDesktop && (canNext || hasMore) && (
        <div className={styles['slider__arrow--right']}>
          <ArrowButton direction='right' onClick={handleNext} disabled={loading && !canNext} />
        </div>
      )}
    </div>
  );
};

export default Slider;
