import React from 'react';
import styles from './HomePage.module.scss';
import { Link } from 'react-router-dom';

import imgPaperLg from '../../assets/images/home_makepaper_lg.webp';
import imgPaperSm from '../../assets/images/home_makepaper_sm.webp';
import imgImojiLg from '../../assets/images/home_addimoji_lg.webp';
import imgImojiSm from '../../assets/images/home_addimoji_sm.webp';

import Button from '../../components/Button/Button';

const HomePage = () => (
  <main>
    <section className={styles['page-points']}>
      {/* Point 01 */}
      <article className={styles['points-container']}>
        <div className={styles['points-container__context']}>
          <span>Point. 01</span>
          <h1>누구나 손쉽게, 온라인 롤링 페이퍼를 만들 수 있어요</h1>
          <p>로그인 없이 자유롭게 만들어요.</p>
        </div>
        <div className={styles['points-container__img-wrapper']}>
          <img
            className={styles['points-container__img']}
            src={imgPaperLg}
            srcSet={`${imgPaperLg} 720w, ${imgPaperSm} 355w`}
            sizes='(min-width: 768px) 720px, 400px'
            alt='롤링페이퍼 이미지'
          />
        </div>
      </article>

      {/* Point 02 */}
      <article className={`${styles['points-container']} ${styles['points-container--reverse']}`}>
        <div className={styles['points-container__context']}>
          <span>Point. 02</span>
          <h1>서로에게 이모지로 감정을 표현해보세요</h1>
          <p>롤링 페이퍼에 이모지를 추가할 수 있어요.</p>
        </div>
        <div className={styles['points-container__img-wrapper']}>
          <img
            className={styles['points-container__img']}
            src={imgImojiLg}
            srcSet={`${imgImojiLg} 720w, ${imgImojiSm} 355w`}
            sizes='(min-width: 768px) 720px, 315px'
            alt='이모지 이미지'
          />
        </div>
      </article>

      <Link to='/list'>
        <Button className={styles['page-points__button']}>구경해보기</Button>
      </Link>
    </section>
  </main>
);

export default HomePage;
