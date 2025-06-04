import React from 'react';
import styles from './Button.module.scss';

function Button({
  children,
  state = 'enabled',
  size = 'large',
  variant = 'primary',
  iconOnly = false,
}) {
  const isDisabled = state === 'disabled';

  let className = '';

  //  1. 유효한 사이즈 검사 (Outlined에서만 필요)
  const allowedSizes = ['56', '40', '36', '28', 'small', 'large'];
  if (!allowedSizes.includes(size)) {
    throw new Error(` 지원하지 않는 size: ${size}`);
  }

  if (variant === 'secondary') {
    className = isDisabled ? styles['secondary-small-disabled'] : styles['secondary-small'];
  } else if (variant === 'outlined') {
    // 아이콘 전용 (예외 케이스)
    if (iconOnly && size === '36') {
      className = styles['outlined-icon-36'];
    } else {
      const key = `outlined-${size}${isDisabled ? '-disabled' : ''}`;
      className = styles[key];
    }
  } else {
    // primary 버튼
    className =
      size === 'small'
        ? styles[`${state}-small`] // enabled-small 등
        : styles[state]; // enabled, disabled
  }

  return (
    <button className={className} disabled={isDisabled}>
      {children}
    </button>
  );
}

export default Button;
