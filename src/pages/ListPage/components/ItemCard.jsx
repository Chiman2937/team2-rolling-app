import styles from './ItemCard.module.scss';

const ItemCard = ({ data }) => {
  const { name, backgroundColor, backgroundImageURL, messageCount, topReactions } = data;

  const backgroundStyle = backgroundImageURL
    ? {
        backgroundImage: `url(${backgroundImageURL})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : {
        backgroundColor: `var(--color-${backgroundColor}-200)`,
      };

  return (
    <div className={styles['item-card']} style={backgroundStyle}>
      <div className={styles['item-card__content']}>
        <h3 className={styles['item-card__title']}> To. {name}</h3>
        <p className={styles['item-card__meta']}>{messageCount}명이 작성했어요!</p>
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
