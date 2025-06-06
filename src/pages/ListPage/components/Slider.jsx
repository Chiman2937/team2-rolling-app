import { useState } from 'react';
import styles from './Slider.module.scss';
import ItemCard from './ItemCard';
import ArrowButton from '../../../components/Button/ArrowButton';

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
        <div className={styles['slider__arrow--left']}>
          <ArrowButton direction='left' onClick={handlePrev} disabled={!showPrev} />
        </div>
      )}

      <div className={styles['slider__container']}>
        <div className={styles['slider__track']}>
          {cardsToShow.map((card, idx) => (
            <ItemCard key={`${card.id}-${idx}`} data={card} />
          ))}
        </div>
      </div>

      {showNext && (
        <div className={styles['slider__arrow--right']}>
          <ArrowButton direction='right' onClick={handleNext} disabled={!showNext} />
        </div>
      )}
    </div>
  );
};

export default Slider;
