import { useRef } from 'react';
import styles from './Slider.module.scss';
import ItemCard from './ItemCard';
import ArrowButton from '../../../components/Button/ArrowButton';
import HorizontalScrollContainer from '../../../components/HorizontalScrollContainer/HorizontalScrollContainer';
import { useSliderPaging } from '@/hooks/useSliderPaging';
import InfinityScrollWrapper from '@/components/InfinityScrollWrapper/InfinityScrollWrapper';

const CARD_WIDTH = 275;
const GAP = 16;
const PAGE_SIZE = 4;

const Slider = ({ cards, hasNext, loadMore }) => {
  const scrollObserverRef = useRef(null);
  const { wrapperRef, isDesktop, pageIndex, canPrev, canNext, goPrev, goNext } = useSliderPaging({
    totalItems: cards.length,
    pageSize: PAGE_SIZE,
    cardWidth: CARD_WIDTH,
    gap: GAP,
    breakpoint: 1200,
  });

  // 데스크톱 전용: 현재 페이지에 해당하는 카드만
  const visibleCards = isDesktop
    ? cards.slice(pageIndex * PAGE_SIZE, pageIndex * PAGE_SIZE + PAGE_SIZE)
    : cards;

  // 오른쪽 화살표 클릭 핸들러
  const handleNext = () => {
    if (isDesktop) {
      const totalPage = Math.max(0, Math.ceil(cards.length / PAGE_SIZE) - 1);
      if (pageIndex < totalPage) {
        goNext();
      } else if (pageIndex === totalPage && hasNext) {
        // 마지막 페이지이면서 서버에 더 있으면 추가 로드
        loadMore();
      }
    } else {
      // 모바일에서는 그냥 loadMore()로 충분
      loadMore();
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
        <HorizontalScrollContainer ref={scrollObserverRef} hideScroll={false}>
          <InfinityScrollWrapper
            hasNext={hasNext}
            callback={loadMore}
            isHorizontal
            scrollObserverRef={scrollObserverRef}
          >
            <div className={styles['slider__track']}>
              {visibleCards.map((c) => (
                <ItemCard key={c.id} data={c} />
              ))}
            </div>
          </InfinityScrollWrapper>
        </HorizontalScrollContainer>
      </div>

      {isDesktop && (canNext || hasNext) && (
        <div className={styles['slider__arrow--right']}>
          <ArrowButton direction='right' onClick={handleNext} />
        </div>
      )}
    </div>
  );
};

export default Slider;
