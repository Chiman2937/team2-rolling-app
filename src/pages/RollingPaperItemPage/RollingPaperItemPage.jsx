import { useEffect, useState } from 'react';
import styles from '@/pages/RollingPaperItemPage/RollingPaperItemPage.module.scss';
import ItemCard from '@/components/ItemCard';
import {
  getRecipientsDetail,
  getRecipientsMessages,
  getRecipientsReactions,
} from '@/apis/ItemsApi';

function RollingPaperItemPage() {
  const [isEditMode, setIsEditMode] = useState(false);

  const [itemData, setItemData] = useState({
    backgroundColor: '',
    backgroundImageURL: '',
    reactionCount: 0,
    topReactions: [],
  });

  // const [offset, setOffset] = useState(0);
  // const [limit, setLimit] = useState(6);
  // const [hasNext, setHasNext] = useState(null);
  const [itemList, setItemList] = useState([]);

  const containerStyle = {
    backgroundColor: itemData.backgroundColor ? '' : itemData.backgroundColor,
    backgroundImage: itemData.backgroundImageURL ? `url(${itemData.backgroundImageURL})` : 'none',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  };

  const handleOnClickEdit = () => {
    setIsEditMode(true);
  };

  const getItemDetail = async () => {
    try {
      const data = await getRecipientsDetail('11727');
      const { backgroundColor, backgroundImageURL, reactionCount, topReactions } = data;
      setItemData({ backgroundColor, backgroundImageURL, reactionCount, topReactions });
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  const getMessageList = async (params = {}) => {
    try {
      const data = await getRecipientsMessages('11727', params);
      const { results } = data;
      setItemList(results);
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  const getReactions = async () => {
    try {
      const data = await getRecipientsReactions('11727');
      console.log(data);
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  useEffect(() => {
    getItemDetail();
    getReactions({ limit: 8, offset: 0 });
  }, []);

  useEffect(() => {
    getMessageList({ limit: 8, offset: 0 });
  }, []);

  return (
    <>
      {/* 헤더 영역 */}
      <section style={containerStyle} className={styles['list']}>
        <div className={styles['list__container']}>
          {!isEditMode && (
            <button className={styles['list__button']} onClick={handleOnClickEdit}>
              수정하기
            </button>
          )}
          {isEditMode && <button className={styles['list__button']}>삭제하기</button>}
          <div className={styles['list__grid']}>
            {!isEditMode && <ItemCard isAddCard />}
            {itemList.map((item) => (
              <ItemCard key={item.id} cardData={item} isEditMode={isEditMode} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default RollingPaperItemPage;
