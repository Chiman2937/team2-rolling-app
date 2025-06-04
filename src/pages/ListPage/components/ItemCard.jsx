import styles from './ItemCard.module.scss';
import { Link } from 'react-router-dom';

const ItemCard = ({ data }) => {
  const {
    id,
    name,
    backgroundColor,
    backgroundImageURL,
    messageCount,
    recentMessages,
    topReactions,
  } = data;

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

  // 이미지가 있으면 추가 클래스(item-card__content--image)도 붙이기
  const contentClassNames = [
    styles['item-card__content'],
    backgroundImageURL ? styles['item-card__content--image'] : '',
  ].join(' ');

  // recentMessages 중 프로필 URL만 뽑아서 최대 3개 사용
  const profileImages = recentMessages
    ? recentMessages.map((msg) => msg.profileImageURL).slice(0, 3)
    : [];

  // +n 으로 표시할 남은 작성자 수
  const remainingCount =
    messageCount > profileImages.length ? messageCount - profileImages.length : 0;

  return (
    <Link
      to={`/post/${id}`}
      className={styles['item-card__link']}
      style={{ textDecoration: 'none' }}
    >
      <div className={styles['item-card']} style={backgroundStyle}>
        <div className={contentClassNames}>
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
          <div className={styles['item-card__myDiv']}></div>
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
    </Link>
  );
};

export default ItemCard;
