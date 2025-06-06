import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApi } from '@/hooks/useApi.jsx';
import { useModal } from '@/hooks/useModal';
import styles from '@/pages/RollingPaperItemPage/RollingPaperItemPage.module.scss';
import ListCard from './components/ListCard';
import ActionCard from './components/ActionCard';
import CardModal from '../../components/CardModal';
import { getRecipient } from '@/apis/recipientsApi';
import { deleteMessage } from '@/apis/messagesApi';
import { deleteRecipient } from '@/apis/recipientsApi';
import { useMessageItemsList } from '@/hooks/useMessageItemsList';
import { useInfinityScroll } from '@/hooks/useInfinityScroll';
import { COLOR_STYLES } from '../../constants/colorThemeStyle';
import ListButtonGroup from './components/ListButtonGroup';

const RollingPaperItemPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { showModal, closeModal } = useModal();
  const [isEditMode, setIsEditMode] = useState(false);

  /* useApi 사용하여 API 불러오는 영역  */
  const { data: getRecipientData } = useApi(getRecipient, { id }, { immediate: true });
  const { refetch: deleteMessageRefetch } = useApi(deleteMessage, { id }, { immediate: false });
  const { refetch: deleteRecipientRefetch } = useApi(deleteRecipient, { id }, { immediate: false });

  /* 커스텀훅 영역 */
  const { itemList, hasNext, loadMore, initializeList } = useMessageItemsList(id); // 리스트 데이터 API 및 동작
  const { observerRef } = useInfinityScroll({ hasNext, callback: loadMore }); // 무한 스크롤 동작

  /* 전체 배경 스타일 적용 */
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

  /* 버튼, 카드 클릭 시 동작  */
  const handleOnClickEdit = () => {
    setIsEditMode(true);
  };

  const handleOnClickPrev = () => {
    setIsEditMode(false);
  };

  const handleOnClickGoList = () => {
    navigate('/list');
  };

  const handleOnClickCard = (modalData) => {
    showModal(<CardModal modalItems={modalData} onClose={closeModal} />);
  };

  const handleOnClickAdd = () => {
    navigate('message');
  };

  const handleMessageDelete = async (messageId) => {
    try {
      await deleteMessageRefetch({ id: messageId });
      initializeList();
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

  return (
    <>
      {/* 헤더 영역 */}
      <section style={containerStyle} className={styles['list']}>
        <div className={styles['list__container']}>
          <ListButtonGroup
            showDelete={isEditMode}
            onClickDelete={handleRecipientsDelete}
            onClickEdit={handleOnClickEdit}
            onClickPrev={handleOnClickPrev}
            onClickGoList={handleOnClickGoList}
          />
          <div className={styles['list__grid']}>
            {!isEditMode && <ActionCard onAction={handleOnClickAdd} />}
            {itemList?.map((item) => (
              <ListCard
                key={item.id}
                cardData={item}
                isEditMode={isEditMode}
                onClick={handleOnClickCard}
                onDelete={handleMessageDelete}
              />
            ))}
          </div>
          {/* 무한 스크롤 감지하는 영역*/}
          <div ref={observerRef} className={styles['list__observer']} />
        </div>
      </section>
    </>
  );
};

export default RollingPaperItemPage;
