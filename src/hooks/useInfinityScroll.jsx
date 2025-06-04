import { useEffect, useRef } from 'react';

export const useInfinityScroll = ({ hasNext, callback }) => {
  const observerRef = useRef(null);

  useEffect(() => {
    const onScroll = (entries) => {
      const firstEntry = entries[0];
      if (firstEntry.isIntersecting && hasNext) {
        callback();
      }
    };
    const observer = new IntersectionObserver(onScroll);
    const currentRef = observerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [hasNext, callback]);

  return { observerRef };
};
