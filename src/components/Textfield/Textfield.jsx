import styles from '@/components/Textfield/Textfield.module.scss';
/*
  [Textfield 속성]
  value: 텍스트필드 값
  onChangeVal: 컴포넌트 밖에서 텍스트필드 값을 변경하는 메소드 전달 필요
  disabled: 비활성화 상태
  error: 에러 상태
  success: 성공 상태
  message: 에러/성공 상태 시 메세지 출력
*/
function Textfield({ value, onChange, error, success, message, disabled }) {
  return (
    <>
      <input
        value={value}
        className={`${styles['textfield']} ${error ? styles['error'] : ''} ${success ? styles['success'] : ''} `}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
      />
      {!disabled && (error || success) && (
        <div className={`${styles.message} ${styles[error ? 'error-message' : 'success-message']}`}>
          {message}
        </div>
      )}
    </>
  );
}

export default Textfield;
