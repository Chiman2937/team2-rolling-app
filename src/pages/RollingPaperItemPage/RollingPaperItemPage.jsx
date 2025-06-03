import styles from '@/pages/RollingPaperItemPage/RollingPaperItemPage.module.scss';
import ItemCard from '../../components/ItemCard';

/* 테스트 데이터 */
const itemList = [
  {
    id: 1,
    recipientId: 1,
    sender: '배수민',
    profileImageURL: '',
    relationship: '동료',
    content:
      '내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다.',
    font: 'Pretendard',
    createAt: '2025-06-03T10:15:30Z',
  },
  {
    id: 2,
    recipientId: 2,
    sender: '김치영',
    profileImageURL: '',
    relationship: '동료',
    content:
      '내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다.',
    font: 'Pretendard',
    createAt: '2025-06-03T10:15:30Z',
  },
  {
    id: 3,
    recipientId: 3,
    sender: '이수연',
    profileImageURL: '',
    relationship: '동료',
    content:
      '내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다.',
    font: 'Pretendard',
    createAt: '2025-06-03T10:15:30Z',
  },
  {
    id: 4,
    recipientId: 4,
    sender: '정해성',
    profileImageURL: '',
    relationship: '동료',
    content:
      '내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다.',
    font: 'Pretendard',
    createAt: '2025-06-03T10:15:30Z',
  },
  {
    id: 5,
    recipientId: 5,
    sender: '염휘건',
    profileImageURL: '',
    relationship: '동료',
    content:
      '내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다.',
    font: 'Pretendard',
    createAt: '2025-06-03T10:15:30Z',
  },
];

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
      <section style={containerStyle} className={styles['list']}>
        <div className={styles['list__container']}>
          <button className={styles['list__button']}>삭제하기</button>
          <div className={styles['list__card']}>
            <ItemCard isAddCard />
            {itemList.map((item) => (
              <ItemCard key={item.id} cardData={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default RollingPaperItemPage;
