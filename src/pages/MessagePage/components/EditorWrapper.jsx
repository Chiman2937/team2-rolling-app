// src/pages/MessagePage/components/EditorWrapper.jsx
import styles from './EditorWrapper.module.scss';
import Editor from '@/components/Editor/Editor';

const EditorWrapper = ({
  inputId = '',
  value,
  onChange,
  onBlur,
  isValid = null, // null | true | false
  message,
  font,
  className = '',
}) => {
  /* 상태별 클래스 계산 */
  const wrapperClass = {
    null: '',
    false: 'editor-wrapper--error',
    true: 'editor-wrapper--success',
  };

  const messageStateClass = {
    null: '',
    false: 'editor-wrapper__message--error',
    true: 'editor-wrapper__message--success',
  };

  const handleUpdate = (html) => onChange(html);

  const showMessage = message && isValid === false;

  return (
    <div className={styles['editor-wrapper__container']}>
      <div
        className={`
          ${className}
          ${styles['editor-wrapper']}
          ${styles[wrapperClass[isValid]]}`}
      >
        <Editor
          inputId={inputId}
          content={value}
          onUpdate={handleUpdate}
          font={font}
          onBlur={onBlur}
          className={styles['editor-wrapper__editor']}
        />
      </div>

      {showMessage && (
        <div
          className={`
            ${styles['editor-wrapper__message']}
            ${styles[messageStateClass[isValid]]}
          `}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default EditorWrapper;
