import { useRef } from 'react';
import styles from './Slider.module.scss';
import ItemCard from './ItemCard';
import ArrowButton from '@/components/Button/ArrowButton';
import HorizontalScrollContainer from '@/components/HorizontalScrollContainer/HorizontalScrollContainer';
import { useSliderPaging } from '@/hooks/useSliderPaging';
import InfinityScrollWrapper from '@/components/InfinityScrollWrapper/InfinityScrollWrapper';

const CARD_WIDTH = 275;
const GAP = 16;
const PAGE_SIZE = 4;

const Slider = ({ cards, hasNext, loadMore }) => {
  const scrollObserverRef = useRef(null);
  const { wrapperRef, isDesktop, pageIndex, canPrev, canNext, goPrev, goNext, totalPage } =
    useSliderPaging({
      totalItems: cards.length,
      pageSize: PAGE_SIZE,
      cardWidth: CARD_WIDTH,
      gap: GAP,
      breakpoint: 1200,
    });

  // 데스크탑 전용: 현재 페이지에 해당하는 카드만
  const visibleCards = isDesktop
    ? cards.slice(pageIndex * PAGE_SIZE, pageIndex * PAGE_SIZE + PAGE_SIZE)
    : cards;

  const handlePrev = () => pageIndex > 0 && goPrev();
  const handleNext = () => {
    if (pageIndex < totalPage) {
      goNext();
    } else if (hasNext) {
      loadMore();
    }
  };

  return (
    <div className={styles.slider}>
      {isDesktop && canPrev && (
        <div className={styles['slider__arrow--left']}>
          <ArrowButton direction='left' onClick={handlePrev} />
        </div>
      )}

      <div ref={wrapperRef} className={styles['slider__container']}>
        <HorizontalScrollContainer ref={scrollObserverRef} hideScroll={false}>
          {isDesktop ? (
            /* 데스크탑: 무한스크롤 없이, 현재까지 로드된 카드만 렌더 */
            <div className={styles['slider__track']}>
              {visibleCards.map((c) => (
                <ItemCard key={c.id} data={c} />
              ))}
            </div>
          ) : (
            /* 모바일/태블릿: 스크롤 끝 감지로 자동 로드 */
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
          )}
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
