import React from 'react';
import styles from './ArrowButton.module.scss';
import arrowLeft from '@/assets/icons/arrow_left.svg';
import arrowRight from '@/assets/icons/arrow_right.svg';

function ArrowButton({ direction = 'right', onClick, disabled = false }) {
  const icon = direction === 'left' ? arrowLeft : arrowRight;

  return (
    <button className={styles['arrow-button']} onClick={onClick} disabled={disabled}>
      <img src={icon} alt={`${direction} arrow`} width={16} height={16} />
    </button>
  );
}

export default ArrowButton;
