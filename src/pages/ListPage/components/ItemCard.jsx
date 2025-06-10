// src/components/ItemCard/ItemCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ItemCard.module.scss';
import { COLOR_STYLES } from '@/constants/colorThemeStyle';
import ShowAvatars from './ShowAvatars';
import ShowEmoji from './ShowEmoji';

const ItemCard = ({
  data: {
    id,
    name,
    backgroundColor,
    backgroundImageURL,
    messageCount,
    recentMessages = [],
    topReactions = [],
  },
}) => {
  const { primary, border, accent } = COLOR_STYLES[backgroundColor] || {};
  const backgroundStyle = backgroundImageURL
    ? {
        backgroundImage: `url(${backgroundImageURL})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : { backgroundColor: primary, borderColor: border };

  const contentClass = backgroundImageURL
    ? `${styles['item-card__content']} ${styles['item-card__content--image']}`
    : styles['item-card__content'];

  return (
    <Link to={`/post/${id}`} className={styles['item-card__link']}>
      <div className={styles['item-card']} style={backgroundStyle}>
        {backgroundImageURL && (
          <div
            className={styles['item-card__overlay']}
            style={{ background: `linear-gradient(180deg, ${accent} 0%, rgba(0,0,0,0) 100%)` }}
          />
        )}

        <div className={contentClass}>
          <h3 className={styles['item-card__title']}>To. {name}</h3>
          <p className={styles['item-card__meta']}>{messageCount}명이 작성했어요!</p>

          {/* 프로필 아바타 영역 (최대 3) */}
          {recentMessages.length > 0 ? (
            <ShowAvatars
              profiles={recentMessages}
              totalCount={messageCount}
              loading={false}
              error={null}
            />
          ) : (
            <div
              className={styles['item-card__avatars-placeholder']}
              style={{ minHeight: '32px' }}
            />
          )}

          <div className={styles['item-card__myDiv']} />

          {/* 반응 이모지 영역 (최대 3) */}
          {topReactions.length > 0 ? (
            <ShowEmoji emojis={topReactions} />
          ) : (
            <div
              className={styles['item-card__reactions-placeholder']}
              style={{ minHeight: '24px' }}
            />
          )}
        </div>
      </div>
    </Link>
  );
};

export default ItemCard;
