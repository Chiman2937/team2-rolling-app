import { useEffect, useState } from 'react';
import Slider from './components/Slider';
import styles from './ListPage.module.scss';
import Button from '../../components/Button/Button';
import { Link } from 'react-router-dom';

import { listRecipients } from '../../apis/recipientsApi';
import { useApi } from '../../hooks/useApi';

const ListPage = () => {
  /* 무한스크롤: Api 요청 데이터에서 next값이 있는지 확인, true 일때만 데이터를 불러옴 */
  const hasNext = false;
  /* 무한스크롤: 추가 데이터 로드 */
  const loadMore = () => {};

  // 1) useApi로 전체 Recipient 목록(fetch) 요청
  const {
    data: listData,
    // refetch 필요 시 사용 가능
  } = useApi(
    listRecipients,
    { limit: 20, offset: 0 },
    {
      errorMessage: '롤링페이퍼 목록을 불러오는 데 실패했습니다.',
      retry: 1,
      immediate: true, // 마운트 시 자동 호출
    },
  );

  // 2) 정렬된 두 배열을 상태로 관리
  const [popularCards, setPopularCards] = useState([]); // reactionCount 내림차순
  const [recentCards, setRecentCards] = useState([]); // createdAt 최신순

  // 3) listData.results가 들어오는 시점에 한 번만 정렬
  useEffect(() => {
    if (!listData || !Array.isArray(listData.results)) {
      return;
    }
    const arr = listData.results;

    // 인기순 (reactionCount 내림차순)
    const byPopular = [...arr].sort((a, b) => b.reactionCount - a.reactionCount);
    setPopularCards(byPopular);

    // 최신순 (createdAt 최신순)
    const byRecent = [...arr].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setRecentCards(byRecent);
  }, [listData]);

  return (
    <div className={styles['list-page']}>
      {/* 인기 롤링 페이퍼 🔥 */}
      <section className={styles['list-page__section']}>
        <h2 className={styles['list-page__title']}>인기 롤링 페이퍼 🔥</h2>
        <Slider cards={popularCards} hasNext={hasNext} loadMore={loadMore} />
      </section>

      {/* 최근에 만든 롤링 페이퍼 ⭐️ */}
      <section className={styles['list-page__section']}>
        <h2 className={styles['list-page__title']}>최근에 만든 롤링 페이퍼 ⭐️</h2>
        <Slider className={styles['list-page_slider']} cards={recentCards} />
      </section>

      <Link to='/post' style={{ textDecoration: 'none', textAlign: 'center' }}>
        <button className={styles['list-page__createButton']}>나도 만들어보기</button>
      </Link>
    </div>
  );
};

export default ListPage;
