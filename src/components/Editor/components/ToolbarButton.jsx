// src/components/Editor/components/ToolbarButton.jsx

import React, { useCallback } from 'react';
import styles from './ToolbarButton.module.scss';

/**
 * ToolbarButton 컴포넌트
 *
 * @param {string} icon        버튼에 표시할 SVG URL
 * @param {string} label       aria-label
 * @param {boolean} disabled   버튼 비활성화 여부
 * @param {object} editor      Lexical 에디터 인스턴스 (useLexicalComposerContext()[0])
 * @param {object} command     실행할 Lexical 커맨드 상수 (e.g. FORMAT_TEXT_COMMAND)
 * @param {any}    commandArg  커맨드에 넘길 payload (e.g. 'bold', 'italic', undefined)
 * @param {boolean} active     active 상태이면 강조 스타일 적용
 */
export default React.memo(function ToolbarButton({
  icon,
  label,
  disabled = false,
  editor = null,
  command = null,
  commandArg = undefined,
  active = false,
}) {
  const onClick = useCallback(() => {
    if (editor && command) {
      editor.dispatchCommand(command, commandArg);
    }
    console.log(`Command dispatched: ${command}`, commandArg);
  }, [editor, command, commandArg]);

  return (
    <button
      type='button'
      className={`${styles.toolbar__item} ${active ? styles['toolbar__item--active'] : ''}`}
      disabled={disabled}
      onClick={onClick}
      aria-label={label}
    >
      <img src={icon} alt={label} />
    </button>
  );
});
