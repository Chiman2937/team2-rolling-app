import styles from '@/pages/RollingPaperItemPage/RollingPaperItemPage.module.scss';
import ItemCard from '../../components/ItemCard';
import Dropdown from '../../components/Dropdown';
import Textfield from '../../components/Textfield';

function RollingPaperItemPage({ bgColor = 'skyblue', bgImage }) {
  const containerStyle = {
    backgroundColor: bgColor ? bgColor : '',
    backgroundImage: bgImage ? `url(${bgImage})` : 'none',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  };
  return (
    <>
      {/* 헤더 영역 */}
      <div style={containerStyle} className={styles['list']}>
        <div className={styles['list__card']}>
          <ItemCard />
        </div>
      </div>
    </>
  );
}

export default RollingPaperItemPage;
