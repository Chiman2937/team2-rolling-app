import React from 'react';
import styles from './IconButton.module.scss';

function IconButton({ icon, disabled = false, onClick }) {
  return (
    <button
      className={disabled ? styles.disabled : styles.base}
      disabled={disabled}
      onClick={onClick}
    >
      {icon}
    </button>
  );
}

export default IconButton;
