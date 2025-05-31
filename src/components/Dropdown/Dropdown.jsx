import { useState } from 'react';
import styles from '@/components/Dropdown/Dropdown.module.scss';
import arrowIcon from '@/assets/icons/arrow-down.svg';
import arrowIconDisabled from '@/assets/icons/arrow-down-disabled.svg';
/*
  [Dropdown 속성]

  value: 텍스트필드 값

  dropdownItems: 배열. 배열의 각 값은 key, value 객체 형태
  ex) [{name: "친구", value: "friend"}, {name: "동료", value: "colleague"}]

  onClickDropdownItem: 컴포넌트 밖에서 드롭다운 값을 변경하는 메소드 전달 필요

  disabled: 비활성화 상태

  error: 에러 상태
  
  success: 성공 상태
  
  message: 에러/성공 상태 시 메세지 출력
*/
function Dropdown({
  value,
  dropdownItems,
  onClickDropdownItem,
  error,
  success,
  message,
  disabled,
}) {
  const dropdownVal = value.name || dropdownItems?.[0].name || '';
  const [showDropdown, setShowDropdown] = useState(false);

  const onClickDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <>
      <div onClick={onClickDropdown} className={styles['dropdown-container']}>
        <button
          disabled={disabled}
          className={`${styles['dropdown-button']} ${error ? styles['error'] : ''} ${success ? styles['success'] : ''}`}
        >
          <div className={styles['dropdown-button-content']}>
            <div>{dropdownVal}</div>
            <img
              src={disabled ? arrowIconDisabled : arrowIcon}
              className={`${styles['dropdown-icon']} ${showDropdown ? styles['dCropdown-icon-open'] : ''}`}
            />
          </div>
        </button>
        {showDropdown && (
          <ul className={styles['dropdown-list']}>
            {dropdownItems.map((item, index) => (
              <li key={`${item.value}-${index}`} onClick={() => onClickDropdownItem(item)}>
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {!disabled && (error || success) && (
        <div className={`${styles.message} ${styles[error ? 'error-message' : 'success-message']}`}>
          {message}
        </div>
      )}
    </>
  );
}

export default Dropdown;
