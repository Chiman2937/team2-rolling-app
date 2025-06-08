import { useState, useEffect } from 'react';
import { useApi } from '@/hooks/useApi.jsx';
import { listRecipientMessages } from '@/apis/recipientMessageApi';
import { deleteMessage } from '@/apis/messagesApi';
import { deleteRecipient } from '@/apis/recipientsApi';

export const useMessageItemsList = (id) => {
  /* useApi 사용하여 메시지 리스트 호출 */
  const {
    data: messageList,
    loading,
    refetch: getMessageListRefetch,
  } = useApi(listRecipientMessages, { recipientId: id, limit: 8, offset: 0 }, { immediate: true });

  /* useApi 삭제 관련 Api  */
  const { refetch: deleteMessageRefetch } = useApi(deleteMessage, { id }, { immediate: false });
  const { refetch: deleteRecipientRefetch } = useApi(deleteRecipient, { id }, { immediate: false });

  const [itemList, setItemList] = useState([]);
  const hasNext = !!messageList?.next;
  const [offset, setOffset] = useState(0);

  /* API 실행 후 데이터 세팅 */
  useEffect(() => {
    if (loading || !messageList) return;
    const { results, previous } = messageList;
    setItemList((prevList) => (offset === 0 || !previous ? results : [...prevList, ...results]));
  }, [messageList, offset, loading]);

  /* 스크롤 시 데이터 다시 불러옴  */
  const loadMore = () => {
    if (loading || !hasNext) return;
    const newOffset = offset === 0 ? offset + 8 : offset + 6;
    getMessageListRefetch({ recipientId: id, limit: 6, offset: newOffset });
    setOffset(newOffset);
  };

  /* 삭제 후 데이터 초기 상태로 불러옴 */
  const initializeList = () => {
    if (loading) return;
    setOffset(0);
    getMessageListRefetch({ recipientId: id, limit: 8, offset: 0 });
  };

  /* 메시지 삭제 */
  const onClickDeleteMessage = async (messageId) => {
    try {
      await deleteMessageRefetch({ id: messageId });
      initializeList();
    } catch (error) {
      console.error('삭제 시 오류 발생:', error);
    }
  };

  const onDeletePaperConfirm = async (callback) => {
    try {
      await deleteRecipientRefetch({ id });
      callback();
    } catch (error) {
      console.error('롤링페이퍼 삭제 시 오류 발생:', error);
    }
  };

  return { itemList, hasNext, loading, loadMore, onClickDeleteMessage, onDeletePaperConfirm };
};
