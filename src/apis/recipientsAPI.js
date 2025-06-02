import httpClient from './httpClient';

/** 고정 팀 슬러그 (API 경로 앞부분) */
export const TEAM = '2';

/* ------------------------------------------------------------------ */
/* Recipient(수신자) API                        */
/* ------------------------------------------------------------------ */

/**
 * 팀 내 Recipient(롤링페이퍼) 목록 가져오기
 *
 * @param {Object}  [params]             - 페이지네이션 옵션 객체
 * @param {number}  [params.limit=20]    - **가져올 개수** (page size)
 * @param {number}  [params.offset=0]    - **시작 인덱스** (0부터)
 *
 * @returns {Promise<{
 *   count: number,                // 총 Recipient 개수
 *   next: string|null,            // 다음 페이지 URL (없으면 null)
 *   previous: string|null,        // 이전 페이지 URL (없으면 null)
 *   results: Array<{
 *     id: number,
 *     name: string,
 *     backgroundColor: string,
 *     backgroundImageURL: string,
 *     createdAt: string,
 *     messageCount: number,
 *     recentMessages: Array,
 *     reactionCount: number,
 *     topReactions: Array
 *   }>
 * }>}
 */
export const listRecipients = ({ limit = 20, offset = 0 } = {}) =>
  httpClient.get(`/${TEAM}/recipients/`, {
    params: { limit, offset },
  });

/**
 * 새 Recipient(롤링페이퍼) 생성
 *
 * @param {Object}  payload - POST 요청의 Body
 * @param {string}  payload.name                  - **수신자 이름 / 롤링페이퍼 제목** (최대 40자)
 * @param {'beige'|'purple'|'blue'|'green'} payload.backgroundColor
 *                                            - **배경 색상** (Swagger ENUM)
 * @param {string} [payload.backgroundImageURL]   - **배경 이미지 URL** (선택)
 *
 * @returns {Promise<{
 *   id: number,
 *   name: string,
 *   backgroundColor: string,
 *   backgroundImageURL: string|null,
 *   createdAt: string,
 *   messageCount: number,
 *   reactionCount: number,
 *   topReactions: Array
 * }>}  생성된 Recipient 상세
 */
export const createRecipient = ({ name, backgroundColor, backgroundImageURL }) =>
  httpClient.post(`/${TEAM}/recipients/`, {
    name,
    backgroundColor,
    backgroundImageURL,
  });

/**
 * Recipient 상세 조회
 *
 * @param {number|string} id - **Recipient(롤링페이퍼) ID**
 *
 * @returns {Promise<{
 *   id: number,                            // 고유 ID
 *   team?: string,                         // 팀 슬러그 (서버가 포함할 수도 있음)
 *   name: string,                          // 수신자 이름 / 롤링페이퍼 제목
 *   backgroundColor: 'beige'|'purple'|'blue'|'green',
 *                                          // 선택한 배경 색상
 *   backgroundImageURL: string|null,       // 배경 이미지 URL (nullable)
 *   createdAt: string,                     // 생성 시각 (ISO 8601)
 *   messageCount: number|string,           // 등록된 메시지 수
 *   recentMessages: string|Array,          // 최근 메시지(서버 형식)
 *   reactionCount: number,                 // 리액션 총합
 *   topReactions: string|Array             // 상위 리액션(서버 형식)
 * }>}
 *   📌 Swagger `Recipient` 스키마를 그대로 반환합니다.
 */
export const getRecipient = (id) => httpClient.get(`/${TEAM}/recipients/${id}/`);

/**
 * Recipient 삭제
 *
 * @param {number|string} id - **Recipient(롤링페이퍼) ID**
 *
 * @returns {Promise<void>}  성공 시 **HTTP 204 No Content** 를 반환하며,
 *   응답 본문이 없습니다.
 */
export const deleteRecipient = (id) => httpClient.delete(`/${TEAM}/recipients/${id}/`);
