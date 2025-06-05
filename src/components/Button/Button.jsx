import React from 'react';
import styles from './Button.module.scss';

function Button({
  children,
  enabled = true,
  size = 'large',
  variant = 'primary',
  iconOnly = false,
  onClick,
}) {
  const isDisabled = !enabled;

  let className = '';

  //  1. 유효한 사이즈 검사
  const allowedSizes = ['56', '40', '36', '28', 'small', 'large', 'stretch'];
  if (!allowedSizes.includes(size)) {
    throw new Error(` 지원하지 않는 size: ${size}`);
  }

  //  stretch 사이즈 처리 추가
  if (size === 'stretch') {
    className = isDisabled ? styles['stretch-disabled'] : styles['stretch'];
  } else if (variant === 'secondary') {
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
        ? styles[`${enabled ? 'enabled' : 'disabled'}-small`]
        : styles[enabled ? 'enabled' : 'disabled'];
  }

  return (
    <button className={className} disabled={isDisabled} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
