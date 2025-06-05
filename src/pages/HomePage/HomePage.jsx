import styles from './HomePage.module.scss';
import { Link } from 'react-router-dom';

import imgPaperLg from '../../assets/images/home_makepaper_lg.svg';
import imgPaperSm from '../../assets/images/home_makepaper_sm.svg';
import imgImojiLg from '../../assets/images/home_addimoji_lg.png';
import imgImojiSm from '../../assets/images/home_addimoji_sm.png';
import PointsContainer from './PointsContainer';
import Button from '../../components/Button/Button';

const HomePage = () => {
  return (
    <main>
      <section className={styles['page-points']}>
        {landingData.map((card, index) => (
          <PointsContainer key={`${landingData.point}-${index}`} {...card} />
        ))}
        <Link to='/list'>
          <Button>구경해보기</Button>
        </Link>
      </section>
    </main>
  );
};

const landingData = [
  {
    point: 'Point. 01',
    title: '누구나 손쉽게, 온라인 롤링 페이퍼를 만들 수 있어요',
    desc: '로그인 없이 자유롭게 만들어요.',
    imgLg: imgPaperLg,
    imgSm: imgPaperSm,
    alt: '롤링페이퍼 이미지',
  },
  {
    point: 'Point. 02',
    title: '서로에게 이모지로 감정을 표현해보세요',
    desc: '롤링 페이퍼에 이모지를 추가할 수 있어요.',
    imgLg: imgImojiLg,
    imgSm: imgImojiSm,
    alt: '이모지 이미지',
    reverse: true,
  },
];
export default HomePage;
