import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from '@/pages/RollingPaperItemPage/RollingPaperItemPage.module.scss';
import ItemCard from '@/components/ItemCard';
import { listRecipientMessages } from '../../apis/recipientMessageApi';
import { getRecipient } from '../../apis/recipientsApi';
import { listRecipientReactions } from '../../apis/recipientReactionsApi';
// import { createRecipientReaction } from '../../apis/recipientReactionsApi';

function RollingPaperItemPage() {
  const { id } = useParams();
  const [isEditMode, setIsEditMode] = useState(false);

  const [itemData, setItemData] = useState({
    backgroundColor: '',
    backgroundImageURL: '',
    reactionCount: 0,
    topReactions: [],
  });

  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(null);
  const [itemList, setItemList] = useState([]);
  const observerRef = useRef(null);

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
      const data = await getRecipient({ id });
      const { backgroundColor, backgroundImageURL, reactionCount, topReactions } = data;
      setItemData({ backgroundColor, backgroundImageURL, reactionCount, topReactions });
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  const getMessageList = async (params = {}) => {
    try {
      const data = await listRecipientMessages({ recipientId: id, ...params });
      const { results, next } = data;
      setItemList([...itemList, ...results]);
      setHasNext(!!next);
      setOffset((prev) => prev + 8);
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  const getReactions = async (params = {}) => {
    try {
      const data = await listRecipientReactions({ recipientId: id, ...params });
      console.log(data);
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  // const createReaction = async (params = {}) => {
  //   try {
  //     await createRecipientReaction({ recipientId: '11727', ...params });
  //   } catch (error) {
  //     console.error('에러 발생:', error);
  //   }
  // };

  useEffect(() => {
    getItemDetail();
    getReactions({ limit: 8, offset: 0 });
  }, []);

  useEffect(() => {
    getMessageList({ limit: 8, offset: 0 });
  }, []);

  useEffect(() => {
    const onScroll = (entries) => {
      const firstEntry = entries[0];

      if (firstEntry.isIntersecting && hasNext) {
        getMessageList({ limit: 6, offset });
      }
    };

    const observer = new IntersectionObserver(onScroll);

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasNext]);

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
          {/* 무한 스크롤 감지하는 영역*/}
          <div ref={observerRef} />
        </div>
      </section>
    </>
  );
}

export default RollingPaperItemPage;
