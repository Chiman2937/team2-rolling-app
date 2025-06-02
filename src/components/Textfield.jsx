import styles from '@/components/Textfield.module.scss';
/*
  [Textfield 필수 속성]
  - value: 텍스트필드 값
  - onChange: 컴포넌트 밖에서 텍스트필드 값을 변경하는 메소드 전달 필요
  
  [Textfield 상태 속성]
  - disabled: 비활성화 상태
  - error: 에러 상태
  - success: 성공 상태
  - message: 에러/성공 상태 시 메세지 출력
*/
function Textfield({ value, onChange, error, success, message, disabled }) {
  const statusClass = error
    ? styles['textfield--error']
    : success
      ? styles['textfield--success']
      : '';
  return (
    <>
      <input
        value={value}
        className={`${styles['textfield']} ${statusClass} `}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
      />
      {!disabled && (error || success) && (
        <div
          className={`${styles['textfield__message']} ${styles[error ? 'textfield__message--error' : 'textfield__message--success']}`}
        >
          {message}
        </div>
      )}
    </>
  );
}

export default Textfield;
