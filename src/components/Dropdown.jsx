import { useState, useEffect, useRef } from 'react';
import styles from '@/components/Dropdown.module.scss';
import DropdownIcon from '@/components/DropdownIcon.jsx';
/*
  [Dropdown 필수 속성]
  - value: 텍스트필드 값
  - dropdownItems: 배열
  ex) [친구, 지인, 동료, 가족]
  - onChange: 컴포넌트 밖에서 드롭다운 값을 변경하는 메소드 전달 필요

  [Dropdown 상태 속성]
  - disabled: 비활성화 상태
*/

const Dropdown = ({ value, dropdownItems = [], onChange, disabled }) => {
  const dropdownVal = value || dropdownItems?.[0] || '';
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const onClickDropdown = () => {
    setShowDropdown((prev) => !prev);
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
          disabled={disabled}
          onClick={onClickDropdown}
          className={`${styles['dropdown__button']}`}
        >
          <div className={styles['dropdown__button-content']}>
            <div>{dropdownVal}</div>
            <DropdownIcon
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
    </>
  );
};

export default Dropdown;
