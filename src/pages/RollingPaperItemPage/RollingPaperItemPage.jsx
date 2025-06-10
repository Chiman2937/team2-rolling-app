import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useModal } from '@/hooks/useModal';
import { useMessageItemsList } from '@/hooks/useMessageItemsList';
import { COLOR_STYLES } from '@/constants/colorThemeStyle';
import CardModal from '@/components/CardModal';
import PostHeader from '@/components/PostHeader/PostHeader';
import LoadingOverlay from '@/components/LoadingOverlay';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import styles from '@/pages/RollingPaperItemPage/RollingPaperItemPage.module.scss';
import ListCard from '@/pages/RollingPaperItemPage/components/ListCard';
import ActionCard from '@/pages/RollingPaperItemPage/components/ActionCard';
import ListButtonGroup from '@/pages/RollingPaperItemPage/components/ListButtonGroup';
import RequestDeletePaperModal from '@/pages/RollingPaperItemPage/components/RequestDeletePaperModal';
import DeletePaperSuccessModal from '@/pages/RollingPaperItemPage/components/DeletePaperSuccessModal';
import InfinityScrollWrapper from '@/components/InfinityScrollWrapper/InfinityScrollWrapper';
import { getBackgroundStylesFromPostData } from '../../utils/getBackgroundStylesFromPostData';

const RollingPaperItemPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { showModal, closeModal } = useModal();
  const [isEditMode, setIsEditMode] = useState(false);

  /* 커스텀훅 영역 */
  const {
    recipientData,
    itemList,
    hasNext,
    showOverlay,
    showInfinityLoading,
    isLoading,
    loadMore,
    onClickDeleteMessage,
    onDeletePaperConfirm,
  } = useMessageItemsList(id); // 리스트 데이터 API 및 동작

  /* 전체 배경 스타일 적용 */
  const containerStyle = getBackgroundStylesFromPostData({
    backgroundColor: recipientData?.backgroundColor,
    backgroundImageURL: recipientData?.backgroundImageURL,
  });

  const paperDeleteModalData = {
    title: (
      <>
        정말 이 롤링페이퍼를
        <br />
        <strong style={{ color: 'var(--color-purple-600)' }}>{' 삭제'}</strong>
        하시겠습니까?
      </>
    ),
    content: (
      <>
        삭제하면 모든 메시지가 함께 삭제되며
        <br />
        복구할 수 없습니다.
      </>
    ),
  };

  const messageDeleteModalData = {
    title: (
      <>
        메시지를
        <strong style={{ color: 'var(--color-purple-600)' }}>{' 삭제'}</strong>
        하시겠습니까?
      </>
    ),
    content: (
      <>
        삭제하면 메시지가 삭제되며
        <br />
        복구할 수 없습니다.
      </>
    ),
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
  const handleOnClickDeleteMessage = (messageId) => {
    showModal(
      <RequestDeletePaperModal
        onConfirm={() => handleOnDeleteMessageConfirm(messageId)}
        onCancel={closeModal}
        modalItems={messageDeleteModalData}
      />,
    );
  };

  const handleOnDeleteMessageConfirm = async (messageId) => {
    onClickDeleteMessage(messageId);
    closeModal();
  };

  /* 롤링페이퍼 페이퍼 삭제 */
  const handleOnClickDeletePaper = () => {
    showModal(
      <RequestDeletePaperModal
        onConfirm={() => handleOnDeletePaperConfirm()}
        onCancel={closeModal}
        modalItems={paperDeleteModalData}
      />,
    );
  };

  const handleOnDeletePaperConfirm = async () => {
    onDeletePaperConfirm(() =>
      showModal(
        <DeletePaperSuccessModal
          onClose={() => {
            closeModal();
          }}
        />,
        {
          onModalClose: () => {
            navigate('/list');
          },
        },
      ),
    );
  };

  if (showOverlay) {
    return <LoadingOverlay description='롤링페이퍼 메시지를 삭제하고 있어요' />;
  }
  return (
    <>
      {/* 헤더 영역 */}
      <PostHeader id={id} name={recipientData?.name} />
      <section
        style={itemList.length === 0 && isLoading ? {} : containerStyle}
        className={itemList.length === 0 && isLoading ? styles['skeleton-list'] : styles['list']}
      >
        <div className={styles['list__container']}>
          <ListButtonGroup
            showDelete={isEditMode}
            onClickEdit={handleOnClickEdit}
            onClickPrev={handleOnClickPrev}
            onClickGoList={handleOnClickGoList}
          />
          <InfinityScrollWrapper hasNext={hasNext} callback={loadMore}>
            <div className={styles['list__grid']}>
              {!isEditMode && <ActionCard isAdd onAction={handleOnClickAddMessage} />}
              {isEditMode && <ActionCard onAction={handleOnClickDeletePaper} />}
              {itemList.length === 0 &&
                isLoading &&
                new Array(5).fill(0).map((_, i) => <ListCard.skeleton key={i} />)}
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
          </InfinityScrollWrapper>
          {showInfinityLoading && (
            <div className={styles['list__loading']}>
              <LoadingSpinner.dotCircle dotCount={8} dotSize={12} distanceFromCenter={30} />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default RollingPaperItemPage;
