import httpClient from './httpClient';
export const TEAM = '2';

/* ------------------------------------------------------------------ */
/* 메시지 단건 API (/{team}/messages/{id}/)                             */
/* ------------------------------------------------------------------ */

/**
 * 메시지 읽기 (GET)
 *
 * @param {number|string} id - **메시지 ID**
 *
 * @returns {Promise<{
 *   id: number, // 메시지 고유 ID
 *   team: string, // 팀 슬러그
 *   recipientId: number, // 수신자 ID
 *   sender: string, // 작성자 이름
 *   profileImageURL: string, // 프로필 이미지 URL
 *   relationship: '친구'|'지인'|'동료'|'가족', // 작성자와 수신자의 관계
 *   content: string, // 메시지 내용
 *   font: 'Noto Sans'|'Pretendard'|'나눔명조'|'나눔손글씨 손편지체', // 사용 폰트
 *   createdAt: string // 작성 시각
 * }>}  단일 메시지 객체
 */
export const getMessage = (id) => httpClient.get(`/${TEAM}/messages/${id}/`);

/**
 * 메시지 전체 수정 (PUT)
 * ⚠️ 모든 필드를 **완전 교체**합니다.
 *
 * @param {number|string} id - **메시지 ID**
 * @param {Object} payload - PUT 요청의 Body
 * @param {number}  payload.recipientId
 * @param {string}  payload.sender
 * @param {string}  payload.profileImageURL
 * @param {'친구'|'지인'|'동료'|'가족'} payload.relationship
 * @param {string}  payload.content
 * @param {'Noto Sans'|'Pretendard'|'나눔명조'|'나눔손글씨 손편지체'} payload.font
 *
 * @returns {Promise<{
 *   id: number,
 *   team: string,
 *   recipientId: number,
 *   sender: string,
 *   profileImageURL: string,
 *   relationship: string,
 *   content: string,
 *   font: string,
 *   createdAt: string
 * }>}  수정된 메시지 객체
 */
export const updateMessage = (id, payload) =>
  httpClient.put(`/${TEAM}/messages/${id}/`, {
    team: TEAM,
    ...payload,
  });

/**
 * 메시지 부분 수정 (PATCH)
 * 전달한 필드만 변경됩니다.
 *
 * @param {number|string} id - **메시지 ID**
 * @param {Partial<{
 *   recipientId: number,
 *   sender: string,
 *   profileImageURL: string,
 *   relationship: '친구'|'지인'|'동료'|'가족',
 *   content: string,
 *   font: 'Noto Sans'|'Pretendard'|'나눔명조'|'나눔손글씨 손편지체'
 * }>} payload - 일부 또는 전부
 *
 * @returns {Promise<object>}  수정 후 메시지 객체
 */
export const patchMessage = (id, payload) => httpClient.patch(`/${TEAM}/messages/${id}/`, payload);

/**
 * 메시지 삭제 (DELETE)
 *
 * @param {number|string} id - **메시지 ID**
 * @returns {Promise<void>}  성공 시 204(No Content)
 */
export const deleteMessage = (id) => httpClient.delete(`/${TEAM}/messages/${id}/`);
