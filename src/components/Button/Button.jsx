import React from 'react';
import styles from './Button.module.scss';

function Button({
  children,
  enabled = true,
  size = 'large',
  variant = 'primary',
  iconOnly = false,
  icon, //  새로 추가된 icon prop
  onClick,
  className, //  간단하게 변경
  ...rest //  나머지 모든 props 받기
}) {
  const isDisabled = !enabled;

  //  버튼 사이즈에 따른 아이콘 크기 자동 결정
  const getIconSize = () => {
    if (size === '36') return 24;
    if (size === '40') return 24;
    return 24; // 기본값
  };

  //  실제 스펙 기반으로 새로 구현
  const getButtonClassName = () => {
    //  스펙 1: Primary 버튼 (4가지)
    if (variant === 'primary') {
      // 1-1. Primary Large (280×56) - 구경해보기, 나도 만들어보기
      if (size === 'large') {
        return isDisabled ? styles['primary-large-disabled'] : styles['primary-large'];
      }

      // 1-2. Primary Stretch (100%×56) - 생성하기
      if (size === 'stretch') {
        return isDisabled ? styles['primary-stretch-disabled'] : styles['primary-stretch'];
      }

      // 1-3. Primary Medium (120×40) - 모달 확인
      if (size === 'medium') {
        return isDisabled ? styles['primary-medium-disabled'] : styles['primary-medium'];
      }

      // 1-4. Primary Small (92×39) - 삭제하기
      if (size === 'small') {
        return isDisabled ? styles['primary-small-disabled'] : styles['primary-small'];
      }

      throw new Error(`Primary 버튼 지원 사이즈: large, stretch, medium, small. 현재: ${size}`);
    }

    //  스펙 2: Secondary 버튼 (2가지)
    if (variant === 'secondary') {
      // Secondary Small (92×39) - Primary Small과 같은 크기, 다른 스타일
      if (size === 'small') {
        return isDisabled ? styles['secondary-small-disabled'] : styles['secondary-small'];
      }

      // Secondary Stretch (100%×39) - Secondary Small의 너비만 늘린 버전
      if (size === 'stretch') {
        return isDisabled ? styles['secondary-stretch-disabled'] : styles['secondary-stretch'];
      }

      throw new Error(`Secondary 버튼 지원 사이즈: small, stretch. 현재: ${size}`);
    }

    //  스펙 3: Outlined 버튼 (4가지)
    if (variant === 'outlined') {
      // 2-1. Outlined 40px 텍스트 (157×40) - 롤링 페이퍼 만들기
      if (size === '40' && !iconOnly) {
        return isDisabled ? styles['outlined-40-text-disabled'] : styles['outlined-40-text'];
      }

      // 2-2. Outlined 36px 아이콘+텍스트 (89×36) - 이모티콘+추가
      if (size === '36' && !iconOnly) {
        return isDisabled ? styles['outlined-36-text-disabled'] : styles['outlined-36-text'];
      }

      // 2-3. Outlined 36px 아이콘만 (56×36) - 헤더 아이콘들
      if (size === '36' && iconOnly) {
        return isDisabled ? styles['outlined-36-icon-disabled'] : styles['outlined-36-icon'];
      }

      // 2-4. Outlined 40px 아이콘만 (40×40) - 휴지통 삭제
      if (size === '40' && iconOnly) {
        return isDisabled ? styles['outlined-40-icon-disabled'] : styles['outlined-40-icon'];
      }

      throw new Error(
        `Outlined 버튼 지원 조합: 40+텍스트, 36+텍스트, 36+아이콘만, 40+아이콘만. 현재: ${size}, iconOnly=${iconOnly}`,
      );
    }

    // 지원하지 않는 variant
    throw new Error(
      `지원하지 않는 variant: ${variant}. 지원 variant: primary, secondary, outlined`,
    );
  };

  const baseClassName = getButtonClassName();
  const iconSize = getIconSize();

  //  커스텀 className과 합치기
  const finalClassName = className ? `${baseClassName} ${className}` : baseClassName;

  return (
    <button
      className={finalClassName}
      disabled={isDisabled}
      onClick={onClick}
      {...rest} //  나머지 props 전달 (id, data-*, aria-*, style 등)
    >
      {/*  icon prop이 있으면 자동으로 img 태그 생성 */}
      {icon && <img src={icon} alt='' width={iconSize} height={iconSize} />}
      {children}
    </button>
  );
}

export default Button;
