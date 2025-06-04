import { useState, useEffect, useRef } from 'react';
import styles from '@/components/Dropdown.module.scss';
import arrowIcon from '@/assets/icons/arrow-down.svg';
import arrowIconDisabled from '@/assets/icons/arrow-down-disabled.svg';
/*
  [Dropdown 필수 속성]
  - value: 텍스트필드 값
  - dropdownItems: 배열
  ex) [친구, 지인, 동료, 가족]
  - onChange: 컴포넌트 밖에서 드롭다운 값을 변경하는 메소드 전달 필요

  [Dropdown 상태 속성]
  - disabled: 비활성화 상태
  - error: 에러 상태
  - success: 성공 상태
  - message: 에러/성공 상태 시 메세지 출력
*/
function Dropdown({ value, dropdownItems = [], onChange, error, success, message, disabled }) {
  const statusClass = error
    ? styles['dropdown__button--error']
    : success
      ? styles['dropdown__button--success']
      : '';
  const dropdownVal = value || dropdownItems?.[0] || '';
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const onClickDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const onClickDropdownItem = (item) => {
    setShowDropdown(false);
    onChange(item);
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }

    window.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div ref={dropdownRef} className={styles['dropdown']}>
        <button
          type='button'
          onClick={onClickDropdown}
          disabled={disabled}
          className={`${styles['dropdown__button']} ${statusClass}`}
        >
          <div className={styles['dropdown__button-content']}>
            <div>{dropdownVal}</div>
            <img
              src={disabled ? arrowIconDisabled : arrowIcon}
              className={`${styles['dropdown__button-icon']} ${showDropdown ? styles['dropdown__button-icon--open'] : ''}`}
            />
          </div>
        </button>
        {showDropdown && (
          <ul className={styles['dropdown__list']}>
            {dropdownItems.map((item, index) => (
              <li
                key={`${item}-${index}`}
                onClick={() => onClickDropdownItem(item)}
                className={styles['dropdown__list-item']}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>

      {!disabled && (error || success) && (
        <div
          className={`${styles['dropdown__message']} ${styles[error ? 'dropdown__message--error' : 'dropdown__message--success']}`}
        >
          {message}
        </div>
      )}
    </>
  );
}

export default Dropdown;
