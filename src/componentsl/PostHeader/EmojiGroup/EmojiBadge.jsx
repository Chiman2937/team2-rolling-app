// src/components/EmojiGroup/EmojiBadge.jsx
import React from 'react';
import Style from './EmojiBadge.module.scss';

/**
 * EmojiBadge 컴포넌트 (단일 사이즈)
 *
 * @param {object} props
 * @param {string} props.emoji - 화면에 표시할 이모지 기호 (예: "👍", "😍" 등)
 * @param {number} props.count - 해당 이모지의 누적 개수
 * @param {string} [props.className] - 추가 클래스
 * @param {object} [props.style]     - inline 스타일
 */
export default function EmojiBadge({ emoji, count, className = '', style = {} }) {
  return (
    <div className={`${Style['emoji-badge']} ${className}`} style={style}>
      <span>{emoji}</span>
      <span>{count}</span>
    </div>
  );
}
