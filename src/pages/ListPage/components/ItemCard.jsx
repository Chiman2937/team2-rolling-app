// src/components/ItemCard/ItemCard.jsx
import React from 'react';
import styles from './ItemCard.module.scss';

const ItemCard = ({ data }) => {
  const { name, backgroundColor, backgroundImageURL, messageCount, recentMessages, topReactions } =
    data;

  // 배경 처리
  const backgroundStyle = backgroundImageURL
    ? {
        backgroundImage: `url(${backgroundImageURL})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : {
        backgroundColor: `var(--color-${backgroundColor}-200)`,
      };

  // recentMessages 중 프로필 URL만 뽑아서 최대 3개 사용
  const profileImages = recentMessages
    ? recentMessages.map((msg) => msg.profileImageURL).slice(0, 3)
    : [];

  // +n 으로 표시할 남은 작성자 수
  const remainingCount =
    messageCount > profileImages.length ? messageCount - profileImages.length : 0;

  return (
    <div className={styles['item-card']} style={backgroundStyle}>
      <div className={styles['item-card__content']}>
        <h3 className={styles['item-card__title']}>To. {name}</h3>
        <p className={styles['item-card__meta']}>{messageCount}명이 작성했어요!</p>

        {/* 프로필 아바타 3개 + +n 원형 */}
        {profileImages.length > 0 && (
          <div className={styles['item-card__avatars']}>
            {profileImages.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`작성자 ${idx + 1}`}
                className={styles['item-card__avatar']}
                style={{ zIndex: idx + 1 }}
              />
            ))}

            {remainingCount > 0 && (
              <div
                className={styles['item-card__avatar']}
                style={{ zIndex: profileImages.length + 1 }}
              >
                <span className={styles['item-card__more']}>+{remainingCount}</span>
              </div>
            )}
          </div>
        )}

        {/* Top Reactions */}
        {topReactions && topReactions.length > 0 && (
          <div className={styles['item-card__top-reactions']}>
            {topReactions.map((r, idx) => (
              <span key={idx} className={styles['item-card__reaction']}>
                {r.emoji} {r.count}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
