import { useState, useEffect, useCallback } from 'react';
import { useApi } from '@/hooks/useApi.jsx';
import { listRecipientMessages } from '@/apis/recipientMessageApi';

export const useMessageItemsList = (id) => {
  const {
    data: getMessageListData,
    loading,
    refetch: getMessageListRefetch,
  } = useApi(listRecipientMessages, { recipientId: id, limit: 8, offset: 0 }, { immediate: true });

  const [itemList, setItemList] = useState([]);
  const hasNext = !!getMessageListData?.next;
  const [offset, setOffset] = useState(0);

  /* API 실행 후 데이터 세팅 */
  useEffect(() => {
    if (!getMessageListData) return;
    const { results, previous } = getMessageListData;
    setItemList((prevList) => (offset === 0 || !previous ? results : [...prevList, ...results]));
  }, [getMessageListData, offset]);

  /* 스크롤 시 데이터 다시 불러옴  */
  const loadMore = useCallback(() => {
    if (loading || !hasNext) return;

    const newOffset = offset === 0 ? offset + 8 : offset + 6;
    getMessageListRefetch({ recipientId: id, limit: 6, offset: newOffset });
    setOffset(newOffset);
  }, [loading, hasNext, offset, id, getMessageListRefetch]);

  /* 삭제 후 데이터 초기 상태로 불러옴 */
  const initializeList = () => {
    if (loading) return;
    setOffset(0);
    getMessageListRefetch({ recipientId: id, limit: 8, offset: 0 });
  };

  return { itemList, hasNext, loadMore, initializeList, loading };
};
