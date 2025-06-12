import { useState, useEffect } from 'react';
import { useApi } from '@/hooks/useApi.jsx';
import { listRecipientMessages } from '@/apis/recipientMessageApi';
import { deleteMessage } from '@/apis/messagesApi';
import { deleteRecipient } from '@/apis/recipientsApi';
import { getRecipient } from '@/apis/recipientsApi';

export const useMessageItemsList = (id) => {
  /* useApi 사용하여 메시지 리스트 호출 */
  const {
    data: messageList,
    loading: messageLoading,
    refetch: getMessageListRefetch,
  } = useApi(listRecipientMessages, { recipientId: id, limit: 8, offset: 0 }, { immediate: true });

  /* useApi 삭제 관련 Api  */
  const { loading: deleteMessageLoading, refetch: deleteMessageRefetch } = useApi(
    deleteMessage,
    { id },
    { immediate: false },
  );
  const { loading: deleteRecipientLoading, refetch: deleteRecipientRefetch } = useApi(
    deleteRecipient,
    { id },
    { immediate: false },
  );

  const { loading: recipientDataLoading, data: recipientData } = useApi(
    getRecipient,
    { id },
    { immediate: true },
  );

  const [showOverlay, setShowOverlay] = useState(false);
  const [showInfinityLoading, setShowInfinityLoading] = useState(false);
  const isLoading = recipientDataLoading || messageLoading || deleteMessageLoading;
  const [isInitialize, setIsInitialize] = useState(false);

  const [itemList, setItemList] = useState([]);
  const hasNext = !!messageList?.next;
  const [offset, setOffset] = useState(0);
  /* 초기 호출인지 확인 */
  const isFirstCall = offset === 0;

  /* 스크롤 위치 초기화 */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* API 실행 후 데이터 세팅 */
  useEffect(() => {
    if (messageLoading || !messageList) return;
    const { results, previous } = messageList;
    setItemList((prevList) => (isFirstCall || !previous ? results : [...prevList, ...results]));
  }, [messageList, isFirstCall, messageLoading]);

  /* 롤링페이퍼 삭제 시 로딩 오버레이 컴포넌트 처리  */
  useEffect(() => {
    if (deleteRecipientLoading) {
      setShowOverlay(true);
    }
  }, [deleteRecipientLoading]);

  /* 무한스크롤 로딩: 초기, 메시지 삭제 시 로딩X */
  useEffect(() => {
    if (isFirstCall || isInitialize) return;
    if (messageLoading) {
      setShowInfinityLoading(true);
    } else {
      setShowInfinityLoading(false);
    }
  }, [messageLoading, isFirstCall, isInitialize]);

  /* 스크롤 시 데이터 다시 불러옴  */
  const loadMore = () => {
    if (messageLoading || !hasNext || itemList.length === 0) return;
    const newOffset = isFirstCall ? offset + 8 : offset + 6;
    getMessageListRefetch({ recipientId: id, limit: 6, offset: newOffset });
    setOffset(newOffset);
  };

  /* 삭제 후 데이터 초기 상태로 불러옴 */
  const initializeList = () => {
    if (messageLoading) return;
    setIsInitialize(true);
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

  return {
    recipientData,
    itemList,
    hasNext,
    isLoading,
    showOverlay,
    showInfinityLoading,
    loadMore,
    onClickDeleteMessage,
    onDeletePaperConfirm,
  };
};
