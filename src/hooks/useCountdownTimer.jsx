import { useEffect, useRef, useState } from 'react';

/**
 * useCountdownTimer 커스텀 훅
 *
 * @param {number} initialSeconds - 초 단위의 초기 시간을 입력합니다.
 * @returns {{ remainingTime: number, isDone: boolean }}
 * 반환값은 객체 형태이며:
 * - `remainingTime`: 남은 시간 (초 단위 숫자)
 * - `isDone`: 타이머 종료 여부 (`true` 또는 `false`)
 */
export const useCountdownTimer = (initialSeconds) => {
  const [remainingTime, setRemainingTime] = useState(initialSeconds);
  const [isDone, setIsDone] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    setRemainingTime(initialSeconds);
    setIsDone(false);

    intervalRef.current = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev === 0) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setIsDone(true);
          return prev;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [initialSeconds]);

  return { remainingTime, isDone };
};
