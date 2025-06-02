import imgPaperLg from '../../assets/images/home_makepaper_lg.svg';
import imgPaperSm from '../../assets/images/home_makepaper_sm.svg';
import imgImojiLg from '../../assets/images/home_addimoji_lg.png';
import imgImojiSm from '../../assets/images/home_addimoji_sm.png';
import styles from './HomePage.module.scss';

const HomePage = () => {
  return (
    <main>
      <section className={styles['page-cards']}>
        <article className={styles['card-container']}>
          <div className={styles['card-context']}>
            <span>Point. 01</span>
            <h1>누구나 손쉽게, 온라인 롤링 페이퍼를 만들 수 있어요</h1>
            <p>로그인 없이 자유롭게 만들어요.</p>
          </div>
          <div className={styles['card-img-wrapper']}>
            <img
              className={styles['card-img']}
              src={imgPaperLg}
              srcSet={`${imgPaperLg} 768w, ${imgPaperSm} 375w`}
              sizes='(min-width: 768px) 720px,(min-width: 375px) 620px'
              alt='롤링페이퍼 이미지'
            ></img>
          </div>
        </article>
        <article className={`${styles['card-container']} ${styles['reverse']}`}>
          <div className={styles['card-context']}>
            <span>Point. 02</span>
            <h1>서로에게 이모지로 감정을 표현해보세요</h1>
            <p>롤링 페이퍼에 이모지를 추가할 수 있어요.</p>
          </div>
          <div className={styles['card-img-wrapper']}>
            <img
              className={styles['card-img']}
              src={imgImojiLg}
              srcSet={`${imgImojiLg} 768w, ${imgImojiSm} 375w`}
              sizes='(min-width: 768px) 720px,(min-width: 375px) 500px'
              alt='이모지 이미지'
            ></img>
          </div>
        </article>
      </section>
    </main>
  );
};

export default HomePage;
