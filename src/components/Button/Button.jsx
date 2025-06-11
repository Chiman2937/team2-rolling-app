import React from 'react';
import styles from './Button.module.scss';

function Button({
  children,
  enabled = true,
  size = 'large',
  variant = 'primary',
  iconOnly = false,
  icon, // 새로 추가된 icon prop
  onClick,
  className, // 간단하게 변경
  ...rest // 나머지 모든 props 받기
}) {
  const isDisabled = !enabled;

  const getIconSize = () => {
    if (size === '36') return 24;
    if (size === '40') return 24;
    if (size === '32') return 20; //  32 사이즈는 20x20 아이콘
    if (size === '28') return 20; //  28 사이즈는 20x20 아이콘
    return 24; // 기본값
  };

  //  멘토 피드백 2: CSS 클래스 조합 방식으로 개선
  const getButtonClassName = () => {
    const classes = [];

    // 1. variant 클래스 (테마)
    classes.push(styles[variant]); // styles.primary, styles.secondary, styles.outlined

    // 2. size 클래스 (크기)
    classes.push(styles[`size-${size}`]); // styles['size-large'], styles['size-small'], etc.

    // 3. iconOnly 클래스 (아이콘 전용인 경우)
    if (iconOnly) {
      classes.push(styles['icon-only']);
    }

    // 4. disabled 클래스
    if (isDisabled) {
      classes.push(styles.disabled);
    }

    // 5. 클래스들 조합 (빈 값 제거 후 조합)
    return classes.filter(Boolean).join(' ');
  };

  const baseClassName = getButtonClassName();
  const iconSize = getIconSize();

  // 커스텀 className과 합치기
  const finalClassName = className ? `${baseClassName} ${className}` : baseClassName;

  return (
    <button
      className={finalClassName}
      disabled={isDisabled}
      onClick={onClick}
      {...rest} // 나머지 props 전달 (id, data-*, aria-*, style 등)
    >
      {/* icon prop이 있으면 자동으로 img 태그 생성 */}
      {icon && <img src={icon} alt='' width={iconSize} height={iconSize} />}
      {children}
    </button>
  );
}

export default Button;
