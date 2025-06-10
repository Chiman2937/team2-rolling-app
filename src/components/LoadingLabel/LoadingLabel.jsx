// src/components/LoadingLabel/LoadingLabel.jsx
import React from 'react';
import cn from 'classnames';
import styles from './LoadingLabel.module.scss';

/**
 * @param {Object} props
 * @param {boolean} props.loading      - 로딩 중이면 애니메이션, 아니면 loadedText
 * @param {string}  props.loadingText  - 로딩 중일 때 표시할 텍스트
 * @param {string}  props.loadedText   - 로딩 완료 후 표시할 텍스트
 * @param {string}  props.className    - 최상위 <label>에 들어갈 클래스
 */
export default function LoadingLabel({
  loading,
  loadingText = '로딩 중...',
  loadedText = '완료',
  className = '',
}) {
  return (
    <label className={cn(styles.wrapper, className, { [styles.loaded]: !loading })}>
      {/* 깜빡임 애니메이션 텍스트 */}
      <span className={styles.loadingText}>
        {[...loadingText].map((char, i) => (
          <span key={i} style={{ animationDelay: `${i * 0.1}s` }}>
            {char}
          </span>
        ))}
      </span>
      {/* 로드 완료 후 표시될 텍스트 */}
      <span className={styles.loadedText}>{loadedText}</span>
    </label>
  );
}
