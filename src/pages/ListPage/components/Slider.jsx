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

const Slider = ({ cards }) => {
  /* 무한 스크롤에서 스크롤 감지를 위함 */
  const scrollObserverRef = useRef(null);
  /* Api 요청 데이터에서 next값이 있는지 확인, true 일때만 데이터를 불러옴 */
  const hasNext = true;
  /* 추가 데이터 로드 */
  const loadMore = () => {};

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

  return (
    <div className={styles.slider}>
      {isDesktop && canPrev && (
        <div className={styles['slider__arrow--left']}>
          <ArrowButton direction='left' onClick={goPrev} />
        </div>
      )}

      <div ref={wrapperRef} className={styles['slider__container']}>
        <HorizontalScrollContainer ref={scrollObserverRef} hideScroll={false}>
          <InfinityScrollWrapper hasNext={hasNext} callback={loadMore} isHorizontal>
            <div className={styles['slider__track']}>
              {visibleCards.map((c) => (
                <ItemCard key={c.id} data={c} />
              ))}
            </div>
          </InfinityScrollWrapper>
        </HorizontalScrollContainer>
      </div>

      {isDesktop && canNext && (
        <div className={styles['slider__arrow--right']}>
          <ArrowButton direction='right' onClick={goNext} />
        </div>
      )}
    </div>
  );
};

export default Slider;
