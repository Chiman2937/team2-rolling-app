// src/components/ItemCard/ItemCard.jsx
import { Link } from 'react-router-dom';
import styles from './ItemCard.module.scss';
import { COLOR_STYLES } from '@/constants/colorThemeStyle';

const ItemCard = ({ data }) => {
  const {
    id,
    name,
    backgroundColor,
    backgroundImageURL,
    messageCount,
    recentMessages = [],
    topReactions = [],
  } = data;

  // 컬러 테마에서 primary, border, accent 가져오기
  const { primary, border, accent } = COLOR_STYLES[backgroundColor] || {};

  // 배경 설정
  const backgroundStyle = backgroundImageURL
    ? {
        backgroundImage: `url(${backgroundImageURL})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : {
        backgroundColor: primary,
        borderColor: border,
      };

  // 프로필 아바타: 최대 3개
  const topThree = recentMessages.slice(0, 3);
  const extraCount = Math.max(0, messageCount - topThree.length);

  // content 클래스
  const contentClass = backgroundImageURL
    ? `${styles['item-card__content']} ${styles['item-card__content--image']}`
    : styles['item-card__content'];

  return (
    <Link to={`/post/${id}`} className={styles['item-card__link']}>
      <div className={styles['item-card']} style={backgroundStyle}>
        {/* accent 그라데이션 overlay (이미지일 때만) */}
        {backgroundImageURL && (
          <div
            className={styles['item-card__overlay']}
            style={{
              background: `linear-gradient(180deg, ${accent} 0%, rgba(0,0,0,0) 100%)`,
            }}
          />
        )}

        <div className={contentClass}>
          <h3 className={styles['item-card__title']}>To. {name}</h3>
          <p className={styles['item-card__meta']}>{messageCount}명이 작성했어요!</p>

          {/* 프로필 아바타 영역: 항상 렌더 */}
          <div className={styles['item-card__avatars']}>
            {topThree.map((msg, idx) => (
              <img
                key={msg.id}
                src={msg.profileImageURL}
                alt={msg.sender}
                className={styles['item-card__avatar']}
                style={{ zIndex: idx + 1 }}
              />
            ))}

            {extraCount > 0 ? (
              <div className={styles['item-card__avatar']} style={{ zIndex: topThree.length + 1 }}>
                <span className={styles['item-card__more']}>+{extraCount}</span>
              </div>
            ) : (
              // extraCount 없을 때 빈 플레이스홀더 하나
              <div className={styles['item-card__avatar']} style={{ visibility: 'hidden' }}>
                &nbsp;
              </div>
            )}
          </div>

          {/* 구분선 */}
          <div className={styles['item-card__myDiv']} />

          {/* 상위 이모지 반응 영역: 항상 렌더 */}
          <div className={styles['item-card__top-reactions']}>
            {topReactions.length > 0
              ? topReactions.map((r, idx) => (
                  <span key={idx} className={styles['item-card__reaction']}>
                    {r.emoji} {r.count}
                  </span>
                ))
              : // 값이 없을 때 빈 플레이스홀더 두 개
                Array(2)
                  .fill(null)
                  .map((_, idx) => (
                    <span
                      key={idx}
                      className={styles['item-card__reaction']}
                      style={{ visibility: 'hidden' }}
                    >
                      &nbsp;
                    </span>
                  ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ItemCard;
