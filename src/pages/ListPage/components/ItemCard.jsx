// src/components/ItemCard/ItemCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ItemCard.module.scss';
import ShowAvatars from './ShowAvatars';
import ShowEmoji from './ShowEmoji';
import { getBackgroundStylesFromPostData } from '@/utils/getBackgroundStylesFromPostData';
import { getContentStylesFromPostData } from '@/utils/getContentStylesFromPostData';

const ItemCard = ({
  id,
  name,
  backgroundColor,
  backgroundImageURL,
  messageCount,
  recentMessages = [],
  topReactions = [],
}) => {
  // 배경 설정: 이미지가 있으면 이미지, 없으면 컬러
  const backgroundStyle = getBackgroundStylesFromPostData({ backgroundColor, backgroundImageURL });

  // 밝은 색: 검정 텍스트
  // 어두운 색: 하얀색 텍스트
  // 이미지: 하얀색 텍스트 / 어두운색 overlay 적용
  const contentStyle = getContentStylesFromPostData(backgroundImageURL);

  return (
    <Link to={`/post/${id}`} className={styles['item-card__link']}>
      <div className={styles['item-card']} style={backgroundStyle}>
        <div className={styles['item-card__content']} style={contentStyle}>
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
