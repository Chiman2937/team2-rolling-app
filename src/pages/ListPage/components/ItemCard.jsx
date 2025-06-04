import styles from './ItemCard.module.scss';

const ItemCard = ({ data }) => {
  const { name, backgroundColor, backgroundImageURL, messageCount, reactionCount, topReactions } =
    data;

  // 이미지 우선, 없으면 CSS 변수로 배경색, 없으면 기본값
  const backgroundStyle = backgroundImageURL
    ? {
        backgroundImage: `url(${backgroundImageURL})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : backgroundColor
      ? {
          backgroundColor: `var(--color-${backgroundColor}-200)`,
        }
      : { backgroundColor: `var(--color-beige-200)` };

  return (
    <div className={styles['item-card']} style={backgroundStyle}>
      <div className={styles['item-card__content']}>
        <h3 className={styles['item-card__title']}> To. {name}</h3>
        <p className={styles['item-card__meta']}>{messageCount}명이 작성했어요!</p>
        <p>{reactionCount}</p>

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
