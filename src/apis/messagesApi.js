import httpClient from './httpClient';
export const TEAM = '2';

/* -------------------------------------------------------------- */
/* 메시지 단건 API (/{team}/messages/{id}/)                         */
/* -------------------------------------------------------------- */

/**
 * 메시지 읽기 (GET)
 *
 * @param {Object} params
 * @param {number|string} params.id   - 메시지 ID
 *
 * @returns {Promise<{
 *   id: number, // 메시지 ID
 *   team: string, // 팀 이름
 *   recipientId: number, // 수신자 ID
 *   sender: string, // 발신자 이름
 *   profileImageURL: string, // 프로필 이미지 URL
 *   relationship: '친구'|'지인'|'동료'|'가족', // 관계
 *   content: string, // 메시지 내용
 *   font: 'Noto Sans'|'Pretendard'|'나눔명조'|'나눔손글씨 손편지체', // 글꼴
 *   createdAt: string // 생성 일시 (ISO 8601 형식)
 * }>}
 */
export const getMessage = ({ id }) => httpClient.get(`/${TEAM}/messages/${id}/`);

/**
 * 메시지 전체 수정 (PUT)
 * ⚠️ 모든 필드를 **완전 교체**합니다.
 *
 * @param {Object} params
 * @param {number|string} params.id               - 메시지 ID
 * @param {number}        params.recipientId
 * @param {string}        params.sender
 * @param {string}        params.profileImageURL
 * @param {'친구'|'지인'|'동료'|'가족'} params.relationship
 * @param {string}        params.content
 * @param {'Noto Sans'|'Pretendard'|'나눔명조'|'나눔손글씨 손편지체'} params.font
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
 * }>}
 */
export const updateMessage = ({
  id,
  recipientId,
  sender,
  profileImageURL,
  relationship,
  content,
  font,
}) => {
  const payload = {
    team: TEAM,
    recipientId,
    sender,
    profileImageURL,
    relationship,
    content,
    font,
  };

  return httpClient.put(`/${TEAM}/messages/${id}/`, payload);
};

/**
 * 메시지 부분 수정 (PATCH)
 * 전달한 필드만 변경됩니다.
 *
 * @param {Object} params
 * @param {number|string} params.id   - 메시지 ID
 * @param {number}          [params.recipientId]
 * @param {string}          [params.sender]
 * @param {string}          [params.profileImageURL]
 * @param {'친구'|'지인'|'동료'|'가족'} [params.relationship]
 * @param {string}          [params.content]
 * @param {'Noto Sans'|'Pretendard'|'나눔명조'|'나눔손글씨 손편지체'} [params.font]
 *
 * @returns {Promise<object>}  수정 후 메시지 객체
 */
export const patchMessage = ({
  id,
  recipientId,
  sender,
  profileImageURL,
  relationship,
  content,
  font,
}) => {
  const payload = {};
  if (recipientId !== undefined) payload.recipientId = recipientId;
  if (sender !== undefined) payload.sender = sender;
  if (profileImageURL !== undefined) payload.profileImageURL = profileImageURL;
  if (relationship !== undefined) payload.relationship = relationship;
  if (content !== undefined) payload.content = content;
  if (font !== undefined) payload.font = font;

  return httpClient.patch(`/${TEAM}/messages/${id}/`, payload);
};

/**
 * 메시지 삭제 (DELETE)
 *
 * @param {Object} params
 * @param {number|string} params.id   - 메시지 ID
 * @returns {Promise<void>}  성공 시 204(No Content)
 */
export const deleteMessage = ({ id }) => httpClient.delete(`/${TEAM}/messages/${id}/`);
