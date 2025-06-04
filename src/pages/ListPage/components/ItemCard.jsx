// src/components/ItemCard/ItemCard.jsx
import { Link } from 'react-router-dom';
import styles from './ItemCard.module.scss';

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

  // 배경 설정: 이미지가 있으면 이미지, 없으면 컬러
  const backgroundStyle = backgroundImageURL
    ? {
        backgroundImage: `url(${backgroundImageURL})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : {
        backgroundColor: `var(--color-${backgroundColor}-200)`,
      };

  // 이미지 배경인 경우 텍스트를 흰색으로 바꾸는 클래스
  const contentClass = [
    styles['item-card__content'],
    backgroundImageURL && styles['item-card__content--image'],
  ]
    .filter(Boolean)
    .join(' ');

  // 최근 메시지 중 상위 3개만 가져오기
  const topThree = recentMessages.slice(0, 3);
  // 남은 작성자 수 계산
  const extraCount = Math.max(0, messageCount - topThree.length);

  return (
    <Link to={`/post/${id}`} className={styles['item-card__link']}>
      <div className={styles['item-card']} style={backgroundStyle}>
        <div className={contentClass}>
          <h3 className={styles['item-card__title']}>To. {name}</h3>
          <p className={styles['item-card__meta']}>{messageCount}명이 작성했어요!</p>

          {/* 최대 3개 프로필 표시 */}
          {topThree.length > 0 && (
            <div className={styles['item-card__avatars']}>
              {topThree.map((msg, idx) => (
                <img
                  key={msg.id} // 각 메시지의 고유 ID 사용
                  src={msg.profileImageURL}
                  alt={msg.sender}
                  className={styles['item-card__avatar']}
                  style={{ zIndex: idx + 1 }}
                />
              ))}

              {/* 나머지 작성자 수 +n 표시 */}
              {extraCount > 0 && (
                <div
                  className={styles['item-card__avatar']}
                  style={{ zIndex: topThree.length + 1 }}
                >
                  <span className={styles['item-card__more']}>+{extraCount}</span>
                </div>
              )}
            </div>
          )}

          {/* 구분선 */}
          <div className={styles['item-card__myDiv']}></div>

          {/* 상위 이모지 반응 */}
          {topReactions.length > 0 && (
            <div className={styles['item-card__top-reactions']}>
              {topReactions.map((r, idx) => (
                <span key={idx} className={styles['item-card__reaction']}>
                  {r.emoji} {r.cocunt}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ItemCard;
