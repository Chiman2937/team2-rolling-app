// src/components/DropdownButton/DropdownButton.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useDropdownPosition } from '@/hooks/useDropdownPosition';
import styles from './DropdownButton.module.scss';

/**
 * DropdownButton 컴포넌트
 *
 * @param {object} props
 * @param {React.ReactNode} props.ToggleComponent
 *        - 드롭다운을 여닫는 토글 버튼 영역.
 * @param {React.ReactNode} props.ListComponent
 *        - 드롭다운 메뉴 리스트 전체.
 * @param {'row' | 'column'} [props.layout='column']
 *        - 메뉴 펼침 시 내부 아이템을 row(가로) 또는 column(세로)로 펼칠지
 * @param {string} [props.ButtonClassName]
 *        - 토글 버튼 영역에 추가할 클래스 이름
 * @param {string} [props.MenuClassName]
 *        - 메뉴 컨테이너 영역에 추가할 클래스 이름
 * @param {function} [props.onToggle]
 *        - 열기/닫기 상태 변화 시 호출되는 콜백 (인자로 (isOpen: boolean))
 * @param {boolean} [props.openOnHover=false]
 *        - 토글 위에 마우스가 올라갈 때 드롭다운이 열리도록 할지 여부
 */
function DropdownButton({
  ToggleComponent,
  ListComponent,
  layout = 'column',
  ButtonClassName = '',
  MenuClassName = '',
  onToggle,
  openOnHover = false,
}) {
  const [isOpen, setIsOpen] = useState(false);

  // 밖을 클릭했을 때 닫기 위한 ref
  const containerRef = useRef(null);
  const menuRef = useRef(null);
  // 드롭다운 위치 보정 훅
  //커스텀 훅 호출: isOpen이 true일 때마다 위치 보정값(adjustX)을 계산
  const adjustXValue = useDropdownPosition(containerRef, menuRef, isOpen);

  const openDropdown = () => {
    setIsOpen(true);

    onToggle && onToggle(true);
  };

  const closeDropdown = () => {
    setIsOpen(false);

    onToggle && onToggle(false);
  };

  const handleToggleClick = () => {
    setIsOpen((prev) => {
      const next = !prev;
      onToggle && onToggle(next);
      return next;
    });
  };

  // 외부 클릭 시 닫기
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
        onToggle && onToggle(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onToggle]);

  // 호버 동작: openOnHover가 true일 때만 처리
  const handleMouseEnter = () => {
    if (openOnHover) {
      openDropdown();
    }
  };

  const handleMouseLeave = () => {
    if (openOnHover) {
      closeDropdown();
    }
  };

  const wrapperClass = [
    styles.dropdown,
    styles[`dropdown--${layout}`],
    isOpen ? styles['dropdown--open'] : '',
  ]
    .filter(Boolean)
    .join(' ');

  const toggleClass = [styles['dropdown__toggle'], ButtonClassName].filter(Boolean).join(' ');
  const menuClass = [styles['dropdown__menu'], MenuClassName].filter(Boolean).join(' ');

  return (
    <div
      className={wrapperClass}
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={toggleClass} onClick={handleToggleClick}>
        {ToggleComponent}
      </div>
      <div
        ref={menuRef}
        className={menuClass}
        style={{
          transform: isOpen
            ? `scaleY(1) translateX(calc(-50% + ${adjustXValue}px))`
            : `scaleY(0) translateX(calc(-50% + ${adjustXValue}px))`,
        }}
      >
        {ListComponent}
      </div>
    </div>
  );
}

export default DropdownButton;
