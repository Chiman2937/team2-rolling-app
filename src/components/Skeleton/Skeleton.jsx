// src/components/Skeleton/Skeleton.jsx
import React from 'react';
import cn from 'classnames';
import styles from './Skeleton.module.scss';

/**
 * @param {object} props
 * @param {number} [props.count=1]       - 몇 개의 블록을 렌더할지
 * @param {string|number} [props.width]   - 각 블록 너비 (default: '100%')
 * @param {string|number} [props.height]  - 각 블록 높이 (default: '1em')
 * @param {boolean} [props.circle=false]  - 원형 모드 (avatar 등)
 * @param {string} [props.className]      - 추가 클래스
 * @param {object} [props.style]          - 인라인 스타일 추가 (width/height 덮어쓰기 가능)
 */
export default function Skeleton({
  count = 1,
  width = '100%',
  height = '1em',
  circle = false,
  className = '',
  style = {},
  ...rest
}) {
  const items = Array.from({ length: count });

  return items.map((_, idx) => (
    <span
      key={idx}
      className={cn(styles.skeleton, circle && styles.circle, className)}
      style={{
        width,
        height,
        ...style,
      }}
      {...rest}
    />
  ));
}
