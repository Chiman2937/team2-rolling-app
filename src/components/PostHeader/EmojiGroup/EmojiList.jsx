// src/components/EmojiGroup/EmojiList.jsx
import React from 'react';
import EmojiBadge from './EmojiBadge';
import Style from './EmojiList.module.scss';

/**
 * EmojiList 컴포넌트
 *
 * @param {object} props
 * @param {Array<{ id: number, emoji: string, count: number }>} props.emojis
 *        - 백엔드에서 count 내림차순으로 이미 정렬된 최대 8개의 이모지 리스트
 */
export default function EmojiList({ emojis }) {
  return (
    <div className={Style['emoji-list']}>
      {emojis.map((item) => (
        <EmojiBadge
          key={item.id}
          emoji={item.emoji}
          count={item.count}
          size='medium'
          className={Style['emoji-list__badge']}
        />
      ))}
    </div>
  );
}
