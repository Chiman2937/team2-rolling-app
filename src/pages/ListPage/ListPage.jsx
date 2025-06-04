import React, { useEffect, useState, useMemo } from 'react';
import Slider from './components/Slider';
import styles from './ListPage.module.scss';

const ListPage = () => {
  const [rawCards, setRawCards] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // mockdata.json에서 원본 데이터 fetch
  useEffect(() => {
    fetch('/mockdata.json')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) setRawCards(data);
        else throw new Error('mockdata.json이 배열 형태가 아닙니다.');
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      })
      .finally(() => setIsLoading(false));
  }, []);

  // id와 name이 같은 카드끼리 병합
  const mergedCards = useMemo(() => {
    const map = new Map();

    rawCards.forEach((card) => {
      const key = `${card.id}||${card.name}`;
      if (!map.has(key)) {
        map.set(key, {
          id: card.id,
          name: card.name,
          createdAt: card.createdAt,
          messageCount: card.messageCount,
          reactionCount: card.reactionCount,
          backgroundColor: card.backgroundColor,
          backgroundImageURL: card.backgroundImageURL,
          _reactionMap: card.topReactions.reduce((acc, r) => {
            acc[r.emoji] = (acc[r.emoji] || 0) + r.count;
            return acc;
          }, {}),
        });
      } else {
        const existing = map.get(key);
        existing.messageCount += card.messageCount;
        existing.reactionCount += card.reactionCount;

        if (new Date(card.createdAt) > new Date(existing.createdAt)) {
          existing.createdAt = card.createdAt;
        }

        if (!existing.backgroundImageURL && card.backgroundImageURL) {
          existing.backgroundImageURL = card.backgroundImageURL;
          existing.backgroundColor = null;
        } else if (
          !existing.backgroundImageURL &&
          !existing.backgroundColor &&
          card.backgroundColor
        ) {
          existing.backgroundColor = card.backgroundColor;
        }

        card.topReactions.forEach((r) => {
          existing._reactionMap[r.emoji] = (existing._reactionMap[r.emoji] || 0) + r.count;
        });
      }
    });

    return Array.from(map.values()).map((item) => {
      const sortedReactions = Object.entries(item._reactionMap)
        .map(([emoji, count]) => ({ emoji, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 3);

      return {
        id: item.id,
        name: item.name,
        createdAt: item.createdAt,
        messageCount: item.messageCount,
        reactionCount: item.reactionCount,
        backgroundColor: item.backgroundColor,
        backgroundImageURL: item.backgroundImageURL,
        topReactions: sortedReactions,
      };
    });
  }, [rawCards]);

  // → reactionCount 기반 내림차순 정렬
  const popularCards = useMemo(() => {
    return [...mergedCards].sort((a, b) => b.reactionCount - a.reactionCount);
  }, [mergedCards]);

  // createdAt 최신 순 정렬
  const recentCards = useMemo(() => {
    return [...mergedCards].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [mergedCards]);

  if (isLoading) {
    return <div className={styles['list-page__status']}>로딩 중...</div>;
  }
  if (error) {
    return <div className={styles['list-page__status']}>에러 발생: {error}</div>;
  }

  return (
    <div className={styles['list-page']}>
      {/* ① 인기 롤링 페이퍼 (reactionCount 내림차순) */}
      <section className={styles['list-page__section']}>
        <h2 className={styles['list-page__title']}>인기 롤링 페이퍼</h2>
        <Slider cards={popularCards} />
      </section>

      {/* ② 최근에 만든 롤링 페이퍼 (createdAt 최신순) */}
      <section className={styles['list-page__section']}>
        <h2 className={styles['list-page__title']}>최근에 만든 롤링 페이퍼</h2>
        <Slider cards={recentCards} />
      </section>
    </div>
  );
};

export default ListPage;
