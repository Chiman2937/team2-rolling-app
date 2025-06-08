import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApi } from '@/hooks/useApi.jsx';
import { useModal } from '@/hooks/useModal';
import { getRecipient } from '@/apis/recipientsApi';
import { useMessageItemsList } from '@/hooks/useMessageItemsList';
import { useInfinityScroll } from '@/hooks/useInfinityScroll';
import { COLOR_STYLES } from '../../constants/colorThemeStyle';
import styles from '@/pages/RollingPaperItemPage/RollingPaperItemPage.module.scss';
import ListButtonGroup from './components/ListButtonGroup';
import ListCard from './components/ListCard';
import ActionCard from './components/ActionCard';
import CardModal from '../../components/CardModal';
import RequestDeletePaperModal from './components/RequestDeletePaperModal';
import DeletePaperSuccessModal from './components/DeletePaperSuccessModal';
import PostHeader from '@/components/PostHeader/PostHeader';

const RollingPaperItemPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { showModal, closeModal } = useModal();
  const [isEditMode, setIsEditMode] = useState(false);

  /* useApi 사용하여 API 불러오는 영역  */
  const { data: recipientData } = useApi(getRecipient, { id }, { immediate: true });

  /* 커스텀훅 영역 */
  const { itemList, hasNext, loadMore, onClickDeleteMessage, onDeletePaperConfirm } =
    useMessageItemsList(id); // 리스트 데이터 API 및 동작
  const { observerRef } = useInfinityScroll({ hasNext, callback: loadMore }); // 무한 스크롤 동작

  /* 전체 배경 스타일 적용 */
  const containerStyle = {
    backgroundColor: !recipientData?.backgroundImageURL
      ? COLOR_STYLES[recipientData?.backgroundColor]?.primary
      : '',
    backgroundImage: recipientData?.backgroundImageURL
      ? `url(${recipientData?.backgroundImageURL})`
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

  const handleOnClickAddMessage = () => {
    navigate('message');
  };

  /* 메세지 삭제 */
  const handleOnClickDeleteMessage = () => {
    onClickDeleteMessage();
  };

  /* 롤링페이퍼 페이퍼 삭제 */
  const handleOnClickDeletePaper = () => {
    showModal(
      <RequestDeletePaperModal
        onConfirm={() => handleOnDeletePaperConfirm()}
        onCancel={closeModal}
      />,
    );
  };

  const handleOnDeletePaperConfirm = async () => {
    onDeletePaperConfirm(() =>
      showModal(
        <DeletePaperSuccessModal
          onClose={() => {
            closeModal();
            navigate('/list');
          }}
        />,
      ),
    );
  };

  return (
    <>
      {/* 헤더 영역 */}
      <PostHeader id={id} name={recipientData?.name} />
      <section style={containerStyle} className={styles['list']}>
        <div className={styles['list__container']}>
          <ListButtonGroup
            showDelete={isEditMode}
            onClickEdit={handleOnClickEdit}
            onClickPrev={handleOnClickPrev}
            onClickGoList={handleOnClickGoList}
          />
          <div className={styles['list__grid']}>
            {!isEditMode && <ActionCard isAdd onAction={handleOnClickAddMessage} />}
            {isEditMode && <ActionCard onAction={handleOnClickDeletePaper} />}
            {itemList?.map((item) => (
              <ListCard
                key={item.id}
                cardData={item}
                showDelete={isEditMode}
                onClick={handleOnClickCard}
                onDelete={handleOnClickDeleteMessage}
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
