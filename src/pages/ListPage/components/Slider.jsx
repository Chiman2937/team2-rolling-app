import React, { useRef } from 'react';
import styles from './Slider.module.scss';
import ItemCard from './ItemCard';
import ArrowButton from '@/components/Button/ArrowButton';
import { useSliderPaging } from '@/hooks/useSliderPaging';
import InfinityScrollWrapper from '@/components/InfinityScrollWrapper/InfinityScrollWrapper';

const PAGE_SIZE = 4;

const Slider = ({ cards, hasNext, loadMore }) => {
  const scrollObserverRef = useRef(null);
  const { isDesktop, pageIndex, canPrev, canNext, goPrev, goNext } = useSliderPaging({
    totalItems: cards.length,
    pageSize: PAGE_SIZE,
    breakpoint: 1200,
  });

  // 데스크탑: 현재 페이지*4 ~ 페이지*4+4 슬라이스
  // 모바일: 전체 cards (무한 스크롤)
  const visibleCards = isDesktop
    ? cards.slice(pageIndex * PAGE_SIZE, pageIndex * PAGE_SIZE + PAGE_SIZE)
    : cards;

  const handleNext = () => {
    if (canNext) {
      goNext();
    } else if (hasNext) {
      goNext();
      loadMore();
    }
  };

  return (
    <div className={styles.slider}>
      {isDesktop && (
        <div className={styles['slider__arrow--left']}>
          <ArrowButton direction='left' onClick={goPrev} disabled={!canPrev} />
        </div>
      )}

      <div className={styles['slider__container']}>
        {isDesktop ? (
          <div className={styles['slider__track']}>
            {visibleCards.length === 0 &&
              new Array(4).fill(0).map((_, i) => <ItemCard.skeleton key={i} />)}
            {visibleCards.map((card) => (
              <ItemCard
                key={card.id}
                id={card.id}
                name={card.name}
                backgroundColor={card.backgroundColor}
                backgroundImageURL={card.backgroundImageURL}
                messageCount={card.messageCount}
                recentMessages={card.recentMessages}
                topReactions={card.topReactions}
              />
            ))}
          </div>
        ) : (
          <InfinityScrollWrapper
            hasNext={hasNext}
            callback={loadMore}
            isHorizontal
            scrollObserverRef={scrollObserverRef}
          >
            <div className={styles['slider__track']}>
              {visibleCards.length === 0 &&
                new Array(4).fill(0).map((_, i) => <ItemCard.skeleton key={i} />)}
              {visibleCards.map((card) => (
                <ItemCard
                  key={card.id}
                  id={card.id}
                  name={card.name}
                  backgroundColor={card.backgroundColor}
                  backgroundImageURL={card.backgroundImageURL}
                  messageCount={card.messageCount}
                  recentMessages={card.recentMessages}
                  topReactions={card.topReactions}
                />
              ))}
            </div>
          </InfinityScrollWrapper>
        )}
      </div>

      {isDesktop && (canNext || hasNext) && (
        <div className={styles['slider__arrow--right']}>
          <ArrowButton direction='right' onClick={handleNext} disabled={!canNext && !hasNext} />
        </div>
      )}
    </div>
  );
};

export default Slider;
