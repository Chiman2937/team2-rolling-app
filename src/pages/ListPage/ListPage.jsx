import { useEffect, useState } from 'react';
import Slider from './components/Slider';
import styles from './ListPage.module.scss';
import { Link } from 'react-router-dom';
import Button from '@/components/Button/Button';

import { listRecipients } from '@/apis/recipientsApi';
import { useApi } from '@/hooks/useApi';

const ListPage = () => {
  // 인기/최신 각각 오프셋·hasNext 관리
  const [popularOffset, setPopularOffset] = useState(0);
  const [recentOffset, setRecentOffset] = useState(0);
  const [popularHasNext, setPopularHasNext] = useState(false);
  const [recentHasNext, setRecentHasNext] = useState(false);

  // useApi 훅으로 인기순 데이터 페칭
  const {
    data: popularData,
    loading: popularLoading,
    refetch: getPopularList,
  } = useApi(
    listRecipients,
    { limit: 10, offset: popularOffset, sortLike: true },
    {
      errorMessage: '인기 롤링페이퍼 목록을 불러오는 데 실패했습니다.',
      retry: 1,
      immediate: true,
    },
  );

  // useApi 훅으로 최신순 데이터 페칭
  const {
    data: recentData,
    loading: recentLoading,
    refetch: getRecentList,
  } = useApi(
    listRecipients,
    { limit: 10, offset: recentOffset, sortLike: false },
    {
      errorMessage: '최근 롤링페이퍼 목록을 불러오는 데 실패했습니다.',
      retry: 1,
      immediate: true,
    },
  );

  // 인기Cards 상태
  const [popularCards, setPopularCards] = useState([]);
  useEffect(() => {
    if (popularLoading || !popularData) return;
    const { results, next } = popularData;
    setPopularCards((prev) => (popularOffset === 0 ? results : [...prev, ...results]));
    setPopularHasNext(!!next);
  }, [popularData, popularLoading, popularOffset]);

  // 최근Cards 상태
  const [recentCards, setRecentCards] = useState([]);
  useEffect(() => {
    if (recentLoading || !recentData) return;
    const { results, next } = recentData;
    setRecentCards((prev) => (recentOffset === 0 ? results : [...prev, ...results]));
    setRecentHasNext(!!next);
  }, [recentData, recentLoading, recentOffset]);

  // 인기 무한스크롤 로드
  const loadMorePopular = () => {
    if (popularLoading || !popularHasNext) return;
    const newOffset = popularOffset + 10;
    setPopularOffset(newOffset);
    getPopularList({ limit: 10, offset: newOffset, sortLike: true });
  };

  // 최신 무한스크롤 로드
  const loadMoreRecent = () => {
    if (recentLoading || !recentHasNext) return;
    const newOffset = recentOffset + 10;
    setRecentOffset(newOffset);
    getRecentList({ limit: 10, offset: newOffset, sortLike: false });
  };

  return (
    <div className={styles['list-page']}>
      {/* 인기 롤링 페이퍼 🔥 */}
      <section className={styles['list-page__section']}>
        <h2 className={styles['list-page__title']}>인기 롤링 페이퍼 🔥</h2>
        <Slider cards={popularCards} hasNext={popularHasNext} loadMore={loadMorePopular} />
      </section>

      {/* 최근에 만든 롤링 페이퍼 ⭐️ */}
      <section className={styles['list-page__section']}>
        <h2 className={styles['list-page__title']}>최근에 만든 롤링 페이퍼 ⭐️</h2>
        <Slider cards={recentCards} hasNext={recentHasNext} loadMore={loadMoreRecent} />
      </section>

      <Link to='/post'>
        <Button className={styles['list-page__createButton']}>나도 만들어보기</Button>
      </Link>
    </div>
  );
};

export default ListPage;
