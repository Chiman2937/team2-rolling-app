import { useState } from 'react';
import styles from './Slider.module.scss';
import ItemCard from './ItemCard';

const Slider = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerPage = 4;
  const maxIndex = Math.max(0, Math.ceil(cards.length / cardsPerPage) - 1);

  const handlePrev = () => setCurrentIndex((i) => Math.max(i - 1, 0));
  const handleNext = () => setCurrentIndex((i) => Math.min(i + 1, maxIndex));

  const cardsToShow = cards.slice(
    currentIndex * cardsPerPage,
    currentIndex * cardsPerPage + cardsPerPage,
  );

  const showPrev = cards.length > cardsPerPage && currentIndex > 0;
  const showNext = cards.length > cardsPerPage && currentIndex < maxIndex;

  return (
    <div className={styles.slider}>
      {showPrev && (
        <button className={styles['slider__arrow--left']} onClick={handlePrev}>
          {'<'}
        </button>
      )}

      <div className={styles['slider__container']}>
        <div className={styles['slider__track']}>
          {cardsToShow.map((card, idx) => (
            <ItemCard key={`${card.id}-${idx}`} data={card} />
          ))}
        </div>
      </div>

      {showNext && (
        <button className={styles['slider__arrow--right']} onClick={handleNext}>
          {'>'}
        </button>
      )}
    </div>
  );
};

export default Slider;
