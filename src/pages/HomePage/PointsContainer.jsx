import styles from './PointsContainer.module.scss';

const PointsContainer = ({ point, title, desc, imgLg, imgSm, alt, reverse }) => {
  return (
    <article
      className={`${styles['points-container']} ${reverse ? styles['points-container--reverse'] : ''}`}
    >
      <div className={styles['points-container__context']}>
        <span>{point}</span>
        <h1>{title}</h1>
        <p>{desc}</p>
      </div>
      <div className={styles['points-container__img-wrapper']}>
        <img
          className={styles['points-container__img']}
          src={imgLg}
          srcSet={`${imgLg} 768w, ${imgSm} 500w`}
          sizes='(min-width: 768px) 720px, 500px'
          alt={alt}
        />
      </div>
    </article>
  );
};

export default PointsContainer;
