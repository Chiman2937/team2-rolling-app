import httpClient from './httpClient';

/** 고정 팀 슬러그 */
export const TEAM = '2';

// 수신자(Recipient) 엔드포인트는 롤링페이퍼를 받는 사람(또는
// 롤링페이퍼 자체)을 생성하고 관리하는 데 사용됩니다.
// 수신자 ID는 이후 메시지를 보낼 때 사용되며,
// 수신자를 생성함으로써 하나의 롤링페이퍼가 시작됩니다.

/**
 * Recipient 목록 조회
 * @param {{limit?:number, offset?:number}} [params]
 * @returns {Promise<{count:number, results:Array}>}
 */
export const listRecipients = (params = {}) => httpClient.get(`/${TEAM}/recipients/`, { params });

/**
 * Recipient 생성
 * @param {{name:string, backgroundColor:string, backgroundImageURL?:string}} payload
 * @returns {Promise<object>} 생성된 Recipient
 */
export const createRecipient = (payload) => httpClient.post(`/${TEAM}/recipients/`, payload);

/**
 * Recipient 상세
 * @param {number|string} id
 * @returns {Promise<object>}
 */
export const getRecipient = (id) => httpClient.get(`/${TEAM}/recipients/${id}/`);

/**
 * Recipient 삭제
 * @param {number|string} id
 * @returns {Promise<void>}
 */
export const deleteRecipient = (id) => httpClient.delete(`/${TEAM}/recipients/${id}/`);
