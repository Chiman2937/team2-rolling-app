// src/components/DropdownButton/DropdownButton.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useDropdownPosition } from '@/hooks/useDropdownPosition';
import styles from './DropdownButton.module.scss';
import classnames from 'classnames';

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
 * @param {trigger} [props.trigger='click']
 *        - 드롭다운 열기/닫기 트리거 방식 ('click' 또는 'hover', 'always')
 * @param {number} [props.offset=4]
 *        - 드롭다운 메뉴 위치가 보일 간격 (px 단위)
 * @param {number} [props.animationDuration=200]
 *        - 드롭다운 애니메이션 지속 시간 (ms 단위)
 */
function DropdownButton({
  ToggleComponent,
  ListComponent,
  layout = 'column',
  ButtonClassName = '',
  MenuClassName = '',
  onToggle,
  trigger = 'click',
  offset = 4,
  animationDuration = 200,
}) {
  const [isOpen, setIsOpen] = useState(false); // 드롭다운 열림 상태
  const [locked, setLocked] = useState(false); // 클릭 고정인지 여부

  // 밖을 클릭했을 때 닫기 위한 ref
  const containerRef = useRef(null);
  const menuRef = useRef(null);
  // 드롭다운 위치 보정 훅
  const adjustXValue = useDropdownPosition(containerRef, menuRef, isOpen);

  /* ---------- 열고/닫기 헬퍼 ---------- */
  const open = () => {
    setIsOpen(true);
    onToggle?.(true);
  };
  const close = () => {
    setIsOpen(false);
    onToggle?.(false);
  };

  /* ---------- 토글 처리 ---------- */
  const handleToggleClick = () => {
    /* ───────── 1) hover 모드 : 클릭 무시 ───────── */
    if (trigger === 'hover') {
      return; // 아무 동작 없음
    }

    /* ───────── 2) click 모드 : 단순 토글 ───────── */
    if (trigger === 'click') {
      if (isOpen) {
        close(); // 이미 열려 있으면 닫기
      } else if (!isOpen) {
        open(); // 닫혀 있으면 열기
      }
      return;
    }

    /* ───────── 3) always 모드 ───────── */
    if (trigger === 'always') {
      /* 3-1. 닫혀 있으면 : 무조건 열고 lock 해제 */
      if (!isOpen) {
        setLocked(false);
        open();
        return;
      }

      /* 3-2. 열려 있고 lock이 해제되어 있으면 : lock 활성화 */
      if (isOpen && !locked) {
        setLocked(true); // 고정
        return;
      }

      /* 3-3. 열려 있고 lock이 걸려 있으면 : lock 해제 + 닫기 */
      if (isOpen && locked) {
        setLocked(false);
        close();
        return;
      }
    }
  };

  /* ---------- hover 처리 ---------- */
  const handleMouseEnter = () => {
    if (trigger === 'hover' || (trigger === 'always' && !locked)) open();
  };
  const handleMouseLeave = () => {
    if (trigger === 'hover' || (trigger === 'always' && !locked)) close();
  };

  /* ---------- 외부 클릭 시 닫기 ---------- */
  useEffect(() => {
    if (!isOpen || (trigger === 'always' && locked)) return;

    const handleOutside = (e) => {
      if (!containerRef.current?.contains(e.target)) {
        setIsOpen(false);
        onToggle?.(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [isOpen, locked, trigger, onToggle]);

  /* ---------- 애니메이션 시간 계산 ---------- */
  const duration =
    typeof animationDuration === 'number'
      ? { open: animationDuration, close: animationDuration }
      : { open: animationDuration.open, close: animationDuration.close };
  /* ---------- 클래스 이름 설정 ---------- */
  const wrapperClass = classnames(styles.dropdown, styles[`dropdown--${layout}`], {
    [styles['dropdown--open']]: isOpen,
  });
  const toggleClass = classnames(styles['dropdown__toggle'], ButtonClassName);
  const menuClass = classnames(styles['dropdown__menu'], MenuClassName);

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
      {/* 드롭다운 메뉴: null 또는 undefined 경우 표시 안함 */}
      {ListComponent && (
        <div
          ref={menuRef}
          className={menuClass}
          style={{
            marginTop: `${offset}px`,
            transition: `transform ${duration.open}ms ease, opacity ${duration.open}ms ease`,
            transform: isOpen
              ? `scaleY(1) translateX(calc(-50% + ${adjustXValue}px))`
              : `scaleY(0) translateX(calc(-50% + ${adjustXValue}px))`,
            opacity: isOpen ? 1 : 0,
            pointerEvents: isOpen ? 'auto' : 'none',
          }}
        >
          {ListComponent}
        </div>
      )}
    </div>
  );
}

export default DropdownButton;
