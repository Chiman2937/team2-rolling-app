import React from 'react';
import styles from './IconButton.module.scss';

function IconButton({
  icon, //  이미지 경로만 받음
  enabled = true,
  onClick,
  className, //
  ...rest //  나머지 props 지원
}) {
  const isDisabled = !enabled;

  return (
    <button
      className={`${isDisabled ? styles.disabled : styles.base} ${className || ''}`.trim()}
      disabled={isDisabled}
      onClick={onClick}
      {...rest}
    >
      {/*  자동으로 24×24 아이콘 생성 */}
      <img src={icon} alt='' width={24} height={24} />
    </button>
  );
}

export default IconButton;
