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

  if (variant === 'secondary') {
    className = isDisabled ? styles['secondary-small-disabled'] : styles['secondary-small'];
  } else if (variant === 'outlined') {
    if (iconOnly && size === '36') {
      className = styles['outlined-icon-36'];
    } else if (size === '40') {
      className = isDisabled ? styles['outlined-40-disabled'] : styles['outlined-40'];
    } else if (size === '36') {
      className = isDisabled ? styles['outlined-36-disabled'] : styles['outlined-36'];
    } else if (size === '28') {
      className = isDisabled ? styles['outlined-28-disabled'] : styles['outlined-28'];
    } else {
      className = isDisabled ? styles['outlined-56-disabled'] : styles['outlined-56'];
    }
  } else {
    className =
      size === 'small'
        ? styles[`${state}-small`] // 예: enabled-small
        : styles[state]; // 예: enabled
  }
  return (
    <button className={className} disabled={isDisabled}>
      {children}
    </button>
  );
}

export default Button;
