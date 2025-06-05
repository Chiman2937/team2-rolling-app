import React from 'react';
import styles from './IconButton.module.scss';

function IconButton({ icon, enabled = true, onClick }) {
  const isDisabled = !enabled;

  return (
    <button
      className={isDisabled ? styles.disabled : styles.base}
      disabled={isDisabled}
      onClick={onClick}
    >
      {icon}
    </button>
  );
}

export default IconButton;
