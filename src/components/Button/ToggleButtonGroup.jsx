import React, { useState } from 'react';
import styles from './ToggleButton.module.scss';

function ToggleButtonGroup({ options = ['컬러', '이미지'], onChange }) {
  const [selected, setSelected] = useState(options[0]);

  const handleClick = (option) => {
    setSelected(option);
    onChange?.(option); // 상위 컴포넌트에서 사용할 수 있게
  };

  return (
    <div className={styles['toggle-group']}>
      {options.map((option) => (
        <button
          key={option}
          className={`${styles['toggle-button']} ${selected === option ? styles.active : ''}`}
          onClick={() => handleClick(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default ToggleButtonGroup;
