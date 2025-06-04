const BASEURL = 'https://rolling-api.vercel.app';

export const getRecipientsDetail = async (id) => {
  const response = await fetch(`${BASEURL}/2/recipients/${id}/`);

  if (!response.ok) {
    throw new Error('롤링페이퍼 상세를 불러오는데 오류가 발생했습니다');
  }
  const body = await response.json();
  return body;
};

export const getRecipientsMessages = async (id, params = {}) => {
  const queryParams = new URLSearchParams(params).toString();
  const response = await fetch(`${BASEURL}/2/recipients/${id}/messages/?${queryParams}`);

  if (!response.ok) {
    throw new Error('롤링페이퍼 메시지 목록을 불러오는데 오류가 발생했습니다');
  }
  const body = await response.json();
  return body;
};

export const getRecipientsReactions = async (id, params = {}) => {
  const queryParams = new URLSearchParams(params).toString();
  const response = await fetch(`${BASEURL}/2/recipients/${id}/reactions/?${queryParams}`);

  if (!response.ok) {
    throw new Error('롤링페이퍼 리액션 목록을 불러오는데 오류가 발생했습니다');
  }
  const body = await response.json();
  return body;
};
