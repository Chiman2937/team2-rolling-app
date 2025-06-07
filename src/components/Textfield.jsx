import styles from '@/components/Textfield.module.scss';
/*
  [Textfield 필수 속성]
  - value: 텍스트필드 값
  - placeholder: 플레이스홀더 텍스트
  - onChange: 컴포넌트 밖에서 텍스트필드 값을 변경하는 메소드 전달 필요
  
  [Textfield 상태 속성]
  - disabled: 비활성화 상태
  - isValid: 에러 또는 성공 상태 => null(초기상태). true 또는 false 값을 넘긴다.
  - message: 메세지가 있는 경우 출력
*/

const Textfield = ({
  value,
  placeholder = '입력해주세요',
  onChange,
  isValid = null,
  disabled,
  message,
  className,
  ...rest
}) => {
  const statusClass = {
    null: '',
    false: 'textfield--error',
    true: 'textfield--success',
  };

  const statusMessageClass = {
    null: '',
    false: 'textfield__message--error',
    true: 'textfield__message--success',
  };

  const showMessage = !disabled && message;

  return (
    <>
      <div>
        <input
          type='text'
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${className} ${styles['textfield']} ${styles[statusClass[isValid]]} `}
          {...rest}
        />
        {showMessage && (
          <div className={`${styles['textfield__message']} ${styles[statusMessageClass[isValid]]}`}>
            {message}
          </div>
        )}
      </div>
    </>
  );
};

export default Textfield;
