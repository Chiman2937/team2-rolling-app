import style from '@/components/Textfield.module.scss';
/*
  [Textfield 속성]
  value: 텍스트필드 값
  disabled: 비활성화 상태
  error: 에러 상태
  success: 성공 상태
  message: 에러/성공 상태 시 메세지 출력
*/
function Textfield({ value, error, success, message, disabled }) {
  return (
    <>
      <input
        value={value}
        className={`${error ? style.error : ''} ${success ? style.success : ''} ${style.textfield}`}
        disabled={disabled}
      />
      {(error || success) && (
        <div className={`${style.message} ${style[error ? 'error-message' : 'success-message']}`}>
          {message}
        </div>
      )}
    </>
  );
}

export default Textfield;
