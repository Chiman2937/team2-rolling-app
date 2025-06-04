import { useState, useEffect, useCallback } from 'react';
import { useApi } from '@/hooks/useApi.jsx';
import { listRecipientMessages } from '@/apis/recipientMessageApi';

export const useMessageItemsList = (id) => {
  const [itemList, setItemList] = useState([]);
  const [hasNext, setHasNext] = useState(null);
  const [offset, setOffset] = useState(0);

  const {
    data: getMessageListData,
    loading,
    refetch: getMessageListRefetch,
  } = useApi(listRecipientMessages, { recipientId: id, limit: 8, offset: 0 }, { immediate: true });

  const loadMore = useCallback(() => {
    if (loading || !hasNext) return;
    setOffset((prevOffset) => (prevOffset === 0 ? prevOffset + 8 : prevOffset + 6));
  }, [loading, hasNext]);

  const initializeList = () => {
    if (loading) return;
    setOffset(0);
    getMessageListRefetch({ recipientId: id, limit: 8, offset: 0 });
  };

  {
    /* 스크롤 시 offset 변경되어 API 재실행 */
  }
  useEffect(() => {
    if (offset === 0) return;
    getMessageListRefetch({ recipientId: id, limit: 6, offset });
  }, [offset, id, getMessageListRefetch]);

  /* API 실행 후 데이터 세팅 */
  useEffect(() => {
    if (!getMessageListData) return;
    const { results, next, previous } = getMessageListData;
    setItemList((prevList) => (offset === 0 || !previous ? results : [...prevList, ...results]));
    setHasNext(!!next);
  }, [getMessageListData, offset]);

  return { itemList, hasNext, loadMore, initializeList, loading };
};
