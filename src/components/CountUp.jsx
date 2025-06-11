// src/components/CountUp/CountUp.jsx
import { useEffect, useState } from 'react';

/**
 * 숫자 카운트 애니메이션
 *
 * @param {object}   props
 * @param {number}   props.start      - 시작 값
 * @param {number}   props.end        - 종료 값
 * @param {number}   props.duration   - 애니메이션 지속시간(ms)
 * @param {string}   [props.className]
 * @param {function} [props.format]   - 값 포맷터 (예: (v)=>v.toLocaleString())
 */
export default function CountUp({
  start = 0,
  end = 100,
  duration = 1000,
  className = '',
  format = (v) => v,
}) {
  const [value, setValue] = useState(start);
  useEffect(() => {
    const delta = end - start;
    if (delta === 0 || duration === 0) {
      setValue(end);
      return;
    }
    // 애니메이션 단계 계산
    const steps = Math.abs(delta);
    const intervalMs = duration / steps;

    let current = start;
    // setInterval을 사용하여 단계별로 값 업데이트
    // delta > 0: 증가, delta < 0: 감소
    const id = setInterval(() => {
      current += delta > 0 ? 1 : -1;
      setValue(current);

      if (current === end) clearInterval(id);
    }, intervalMs);
    // 컴포넌트 언마운트 시 interval 정리
    return () => clearInterval(id);
  }, [start, end, duration]);

  return <span className={className}>{format(Math.round(value))}</span>;
}
