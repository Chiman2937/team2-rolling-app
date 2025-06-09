import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Slider from './components/Slider';
import styles from './ListPage.module.scss';
import { listRecipients } from '@/apis/recipientsApi';

const BATCH_SIZE = 20;

// 공통 섹션 컴포넌트
const PaginatedSection = ({ title, sortLike }) => {
  const [offset, setOffset] = useState(0);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // 다음 배치 로드 함수
  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      setOffset((prevCards) => prevCards + BATCH_SIZE);
    }
  }, [loading, hasMore]);

  // offset 또는 sortLike 변경 시 API 호출
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    listRecipients({ limit: BATCH_SIZE, offset, sortLike })
      .then(({ results }) => {
        if (!isMounted) return;
        setItems((prev) => [...prev, ...results]);
        if (results.length < BATCH_SIZE) setHasMore(false);
      })
      .catch(() => setHasMore(false))
      .finally(() => isMounted && setLoading(false));

    return () => {
      isMounted = false;
    };
  }, [offset, sortLike]);

  return (
    <section className={styles['list-page__section']}>
      <h2 className={styles['list-page__title']}>{title}</h2>
      {/* Slider가 마지막 페이지에서 우측 화살표 클릭 시 loadMore 호출 */}
      <Slider cards={items} onLoadMore={loadMore} loading={loading} hasMore={hasMore} />
    </section>
  );
};

const ListPage = () => (
  <div className={styles['list-page']}>
    <PaginatedSection title='인기 롤링 페이퍼 🔥' sortLike={true} />
    <PaginatedSection title='최근에 만든 롤링 페이퍼 ⭐️' sortLike={false} />
    <Link to='/post' className={styles['list-page__createLink']}>
      <button className={styles['list-page__createButton']}>나도 만들어보기</button>
    </Link>
  </div>
);

export default ListPage;
