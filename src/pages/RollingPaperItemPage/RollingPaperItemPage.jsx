import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApi } from '@/hooks/useApi.jsx';
import { useModal } from '@/hooks/useModal';
import styles from '@/pages/RollingPaperItemPage/RollingPaperItemPage.module.scss';
import ItemCard from '@/components/ItemCard';
import { listRecipientMessages } from '../../apis/recipientMessageApi';
import { getRecipient } from '../../apis/recipientsApi';
import { deleteMessage } from '../../apis/messagesApi';
import { deleteRecipient } from '../../apis/recipientsApi';

function RollingPaperItemPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { showModal } = useModal();
  const observerRef = useRef(null);

  const [isEditMode, setIsEditMode] = useState(false);

  const { data: getRecipientData } = useApi(getRecipient, { id }, { immediate: true });

  const { data: getMessageListData, refetch: getMessageListRefetch } = useApi(
    listRecipientMessages,
    { recipientId: id, limit: 8, offset: 0 },
    { immediate: true },
  );

  const { refetch: deleteMessageRefetch } = useApi(deleteMessage, { id }, { immediate: false });

  const { refetch: deleteRecipientRefetch } = useApi(deleteRecipient, { id }, { immediate: false });

  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(null);
  const [itemList, setItemList] = useState([]);

  const COLOR_STYLES = {
    beige: {
      primary: 'var(--color-beige-200)',
      accent: 'var(--color-beige-300)',
      border: 'rgb(0,0,0,0.08)',
    },
    purple: {
      primary: 'var(--color-purple-200)',
      accent: 'var(--color-purple-300)',
      border: 'rgb(0,0,0,0.08)',
    },
    blue: {
      primary: 'var(--color-blue-200)',
      accent: 'var(--color-blue-300)',
      border: 'rgb(0,0,0,0.08)',
    },
    green: {
      primary: 'var(--color-green-200)',
      accent: 'var(--color-blue-300)',
      border: 'rgb(0,0,0,0.08)',
    },
  };

  // const reactionData = {
  //   reactionCount: getRecipientData?.reactionCount,
  //   topReactions: getRecipientData?.topReactions,
  // };

  const containerStyle = {
    backgroundColor: !getRecipientData?.backgroundImageURL
      ? COLOR_STYLES[getRecipientData?.backgroundColor]?.primary
      : '',
    backgroundImage: getRecipientData?.backgroundImageURL
      ? `url(${getRecipientData?.backgroundImageURL})`
      : 'none',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  };

  const handleOnClickEdit = () => {
    setIsEditMode(true);
  };

  const handleOnClickCard = (modalData) => {
    showModal(modalData);
  };

  const handleOnClickAdd = () => {
    navigate('message');
  };

  const handleMessageDelete = async (messageId) => {
    try {
      await deleteMessageRefetch({ id: messageId });
      await getMessageListRefetch({ recipientId: id, limit: 8, offset: 0 });
      setOffset(0);
    } catch (error) {
      console.error('삭제 시 오류 발생:', error);
    }
  };

  const handleRecipientsDelete = async () => {
    try {
      await deleteRecipientRefetch({ id });
      navigate('/post/');
    } catch (error) {
      console.error('삭제 후 재요청 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    if (!getMessageListData) return;
    const { results, next, previous } = getMessageListData;
    setItemList((prevList) => (!previous ? results : [...prevList, ...results]));
    setHasNext(!!next);
  }, [getMessageListData]);

  useEffect(() => {
    if (offset === 0) return;
    getMessageListRefetch({ recipientId: id, limit: 6, offset });
  }, [offset, id, getMessageListRefetch]);

  useEffect(() => {
    const onScroll = (entries) => {
      const firstEntry = entries[0];

      if (firstEntry.isIntersecting && hasNext) {
        setOffset((prevOffset) => (prevOffset === 0 ? prevOffset + 8 : prevOffset + 6));
      }
    };

    const observer = new IntersectionObserver(onScroll);
    const currentRef = observerRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
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
          {isEditMode && (
            <button className={styles['list__button']} onClick={handleRecipientsDelete}>
              페이지 삭제
            </button>
          )}
          <div className={styles['list__grid']}>
            {!isEditMode && <ItemCard isAddCard onAdd={handleOnClickAdd} />}
            {itemList.map((item) => (
              <ItemCard
                key={item.id}
                cardData={item}
                isEditMode={isEditMode}
                onClick={handleOnClickCard}
                onDelete={handleMessageDelete}
              />
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
