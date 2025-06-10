import styles from './InfinityScrollWrapper.module.scss';
import { useEffect, useRef } from 'react';

/*
  children: 자식 요소
  hasNext: 다음 데이터가 있는 지 여부 (true, false)
  callback: 스크롤 끝에 도달했을 때 수행할 메소드
  isHorizontal: 무한 스크롤 가로 여부
  scrollObserverRef: 스크롤 대상
*/
const InfinityScrollWrapper = ({
  children,
  hasNext,
  callback,
  isHorizontal = false,
  scrollObserverRef,
}) => {
  const observerRef = useRef(null);

  useEffect(() => {
    /* 스크롤 시 동작 */
    const onScroll = (entries) => {
      const firstEntry = entries[0];
      if (firstEntry.isIntersecting && hasNext) {
        callback();
      }
    };

    /* 무한 스크롤 감시 */
    const observer = new IntersectionObserver(onScroll, {
      threshold: 0.5,
      root: scrollObserverRef?.current ?? null,
    });
    const currentRef = observerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      /* 무한 스크롤 감시를 종료 */
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [observerRef, hasNext, callback, isHorizontal, scrollObserverRef]);

  return (
    <div className={isHorizontal ? styles['container--horizontal'] : styles['container--vertical']}>
      {children}
      <div ref={observerRef} className={styles['container__observer']} />
    </div>
  );
};

export default InfinityScrollWrapper;
