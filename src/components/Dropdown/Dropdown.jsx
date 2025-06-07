// src/components/Dropdown/Dropdown.jsx

import React, { useState, useEffect, useRef } from 'react';
import styles from './Dropdown.module.scss';
import DropdownIcon from './DropdownIcon';

/**
 *  드롭다운 아이템 타입 정의
 * @typedef {Object} DropdownItem
 * @property {string} value             - 실제 선택되는 값
 * @property {string} [label]           - 목록에 표시될 텍스트 (value 대신 사용)
 * @property {React.CSSProperties} [style] - 개별 아이템에 적용할 인라인 스타일
 * @property {string} [className]       - 개별 아이템에 적용할 추가 클래스 이름
 */

/**
 * 드롭다운 컴포넌트
 *
 * @param {Object} props
 * @param {string} props.value                          - 현재 선택된 값
 * @param {(string|DropdownItem)[]} props.dropdownItems - 목록 (문자열 혹은 DropdownItem 객체)
 * @param {(newValue: string) => void} props.onChange   - 값 변경 시 호출되는 콜백
 * @param {boolean} [props.disabled=false]              - 드롭다운 비활성화 여부
 */
export default function Dropdown({ value, dropdownItems = [], onChange, disabled = false }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // items 중 현재 선택된 객체 찾기 (문자열이면 undefined)
  const selectedItem = dropdownItems.find((item) =>
    typeof item === 'string' ? item === value : item.value === value,
  );

  // 버튼에 표시할 텍스트
  const displayLabel =
    selectedItem != null
      ? typeof selectedItem === 'string'
        ? selectedItem
        : (selectedItem.label ?? selectedItem.value)
      : // value 자체가 문자열이면 그대로, 아니면 빈 문자열
        typeof value === 'string'
        ? value
        : '';

  // 버튼에 적용할 스타일 (선택된 아이템 스타일이 있으면)
  const displayStyle = selectedItem && typeof selectedItem !== 'string' ? selectedItem.style : {};

  // 버튼에 적용할 추가 클래스
  const displayClass =
    selectedItem && typeof selectedItem !== 'string' && selectedItem.className
      ? selectedItem.className
      : '';

  return (
    <div ref={ref} className={styles.dropdown}>
      <button
        type='button'
        className={`${styles['dropdown__button']} ${displayClass}`}
        style={displayStyle}
        disabled={disabled}
        onClick={() => !disabled && setOpen((prev) => !prev)}
      >
        <div className={styles['dropdown__button-content']}>
          <span>{displayLabel}</span>
          <DropdownIcon
            className={`
              ${styles['dropdown__button-icon']}
              ${open ? styles['dropdown__button-icon--open'] : ''}
            `}
          />
        </div>
      </button>

      {open && (
        <ul className={styles['dropdown__list']}>
          {dropdownItems.map((item, idx) => {
            const isObj = typeof item !== 'string';
            const itemValue = isObj ? item.value : item;
            const itemLabel = isObj ? (item.label ?? item.value) : item;
            const itemStyle = isObj ? item.style : {};
            const itemClass =
              isObj && item.className
                ? `${styles['dropdown__list-item']} ${item.className}`
                : styles['dropdown__list-item'];

            return (
              <li
                key={`${itemValue}-${idx}`}
                className={itemClass}
                style={itemStyle}
                onClick={() => {
                  onChange(itemValue);
                  setOpen(false);
                }}
              >
                {itemLabel}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
