import styles from './Card.module.scss';

const Card = ({ point, title, desc, imgLg, imgSm, alt, reverse }) => {
  return (
    <article className={`${styles['card-container']} ${reverse ? styles['reverse'] : ''}`}>
      <div className={styles['card-context']}>
        <span>{point}</span>
        <h1>{title}</h1>
        <p>{desc}</p>
      </div>
      <div className={styles['card-img-wrapper']}>
        <img
          className={styles['card-img']}
          src={imgLg}
          srcSet={`${imgLg} 768w, ${imgSm} 500w`}
          sizes='(min-width: 768px) 720px, 500px'
          alt={alt}
        />
      </div>
    </article>
  );
};

export default Card;
