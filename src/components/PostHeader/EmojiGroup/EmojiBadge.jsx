// EmojiBadge.jsx
import { useEffect, useRef, useState } from 'react';
import CountUp from '@/components/CountUp';
import cn from 'classnames';
import Style from './EmojiBadge.module.scss';

export default function EmojiBadge({ emoji, count, addedEmoji, className = '', style = {} }) {
  /* ---------- 애니메이션 제어용 ref ---------- */
  const prevCountRef = useRef(undefined); // undefined → 첫 렌더 감지
  const prev = prevCountRef.current ?? 0; // undefined 면 0으로 처리

  /* ---------- bump (icon scale) ---------- */
  const [bump, setBump] = useState(false);
  const handleEnd = () => setBump(false);
  useEffect(() => {
    // bump 는 오로지 addedEmoji 와 일치할 때만
    if (emoji !== addedEmoji) return;
    setBump(true);
  }, [addedEmoji, emoji]);

  /* ---------- prevCount 갱신 ---------- */
  useEffect(() => {
    prevCountRef.current = count; // 다음 렌더에 사용할 이전 값
  }, [count]);

  /* ---------- render ---------- */
  return (
    <div
      className={cn(Style['emoji-badge'], { [Style['emoji-badge--bump']]: bump }, className)}
      style={style}
      onAnimationEnd={handleEnd} /* bump 애니메이션 끝나면 false로 */
    >
      <span>{emoji}</span>

      {/* CountUp 은 항상 prev → count 로 */}
      <CountUp
        start={prev}
        end={count}
        duration={300}
        key={`${prev}-${count}`} /* 값이 달라질 때마다 재시작 */
      />
    </div>
  );
}
