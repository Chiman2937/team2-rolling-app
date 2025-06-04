import httpClient from './httpClient';

/** 고정 팀 슬러그 (API 경로 앞부분) */
export const TEAM = '2';

/* ------------------------------------------------------------------ */
/*  메시지  API (/{team}/recipients/{recipient_id}/messages/)        */
/* ------------------------------------------------------------------ */

/**
 * 특정 Recipient(롤링페이퍼)의 메시지 목록 가져오기
 *
 * @param {Object}  params
 * @param {number|string} params.recipientId      - **Recipient ID** (필수)
 * @param {number}        [params.limit=20]       - 한 페이지에 가져올 메시지 수
 * @param {number}        [params.offset=0]       - 시작 인덱스 (0부터)
 *
 * @returns {Promise<{
 *   count: number,                     // 총 메시지 개수
 *   next: string|null,                 // 다음 페이지 URL
 *   previous: string|null,             // 이전 페이지 URL
 *   results: Array<{
 *     id: number,                      // 메시지 ID
 *     recipientId: number,             // 수신자 ID
 *     sender: string,                  // 작성자 이름
 *     profileImageURL: string,         // 프로필 이미지 URL
 *     relationship: '친구'|'지인'|'동료'|'가족',
 *     content: string,                 // 메시지 본문
 *     font: 'Noto Sans'|'Pretendard'|'나눔명조'|'나눔손글씨 손편지체',
 *     createdAt: string                // 작성 시각(ISO 8601)
 *   }>
 * }>}
 */
export const listRecipientMessages = ({ recipientId, limit = 20, offset = 0 }) =>
  httpClient.get(`/${TEAM}/recipients/${recipientId}/messages/`, { params: { limit, offset } });

/**
 * Recipient(롤링페이퍼)에 새 메시지 작성
 *
 * @param {Object} payload - POST 요청의 Body
 * @param {number|string} payload.recipientId      - **Recipient ID** (필수)
 * @param {string}        payload.sender           - 작성자 이름 (최대 40자)
 * @param {string}        payload.profileImageURL  - 프로필 이미지 URL
 * @param {'친구'|'지인'|'동료'|'가족'} payload.relationship
 *                                                - 작성자와 수신자의 관계
 * @param {string}        payload.content          - 메시지 내용
 * @param {'Noto Sans'|'Pretendard'|'나눔명조'|'나눔손글씨 손편지체'}
 *                        payload.font             - 사용 폰트
 *
 * @returns {Promise<{
 *   id: number, // 생성된 메시지 ID
 *   team: string, // 팀 슬러그
 *   recipientId: number, // 수신자 ID
 *   sender: string, // 작성자 이름
 *   profileImageURL: string, // 프로필 이미지 URL
 *   relationship: string, // 작성자와 수신자의 관계
 *   content: string, // 메시지 내용
 *   font: string, // 사용 폰트
 *   createdAt: string // 작성 시각
 * }>}  생성된 메시지 객체를 반환합니다.
 */
export const createRecipientMessage = ({
  recipientId,
  sender,
  profileImageURL,
  relationship,
  content,
  font,
}) =>
  httpClient.post(`/${TEAM}/recipients/${recipientId}/messages/`, {
    team: TEAM,
    recipientId,
    sender,
    profileImageURL,
    relationship,
    content,
    font,
  });
