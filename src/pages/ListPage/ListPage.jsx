import Slider from './components/Slider';
import styles from './ListPage.module.scss';
import Button from '@/components/Button/Button';
import { Link } from 'react-router-dom';

import { listRecipients } from '@/apis/recipientsApi';
import { useApi } from '@/hooks/useApi';

const ListPage = () => {
  // 1) 인기순 데이터 (sortLike=true)
  const { data: popularData } = useApi(
    listRecipients,
    { limit: 20, offset: 0, sortLike: true },
    {
      errorMessage: '인기 롤링페이퍼 목록을 불러오는 데 실패했습니다.',
      retry: 1,
      immediate: true, // 마운트 시 자동 호출
    },
  );

  // 2) 최신순 데이터 (sortLike=false)
  const { data: recentData } = useApi(
    listRecipients,
    { limit: 20, offset: 0, sortLike: false },
    {
      errorMessage: '최근 롤링페이퍼 목록을 불러오는 데 실패했습니다.',
      retry: 1,
      immediate: true, // 마운트 시 자동 호출
    },
  );

  const popularCards = popularData?.results ?? [];
  const recentCards = recentData?.results ?? [];

  return (
    <div className={styles['list-page']}>
      {/* 인기 롤링 페이퍼 🔥 */}
      <section className={styles['list-page__section']}>
        <h2 className={styles['list-page__title']}>인기 롤링 페이퍼 🔥</h2>
        <Slider className={styles['list-page_slider']} cards={popularCards} />
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
