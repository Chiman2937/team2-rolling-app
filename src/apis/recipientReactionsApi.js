import httpClient from './httpClient';

/** 고정 팀 슬러그 (API 경로 앞부분) */
export const TEAM = '2';

/* ------------------------------------------------------------------ */
/* 리액션  API (/{team}/recipients/{recipient_id}/reactions/)       */
/* ------------------------------------------------------------------ */

/**
 * 특정 Recipient에 달린 리액션(이모지) 목록
 *
 * @param {Object}  params
 * @param {number|string} params.recipientId      - **Recipient ID** (필수)
 * @param {number}        [params.limit=20]       - 한 페이지에 가져올 항목 수
 * @param {number}        [params.offset=0]       - 시작 인덱스
 *
 * @returns {Promise<{
 *   count: number,
 *   next: string|null,
 *   previous: string|null,
 *   results: Array<{
 *     id: number,
 *     emoji: string,               // 이모지 (예: "🎉")
 *     count: number                // 해당 이모지의 누적 개수
 *   }>
 * }>}
 */
export const listRecipientReactions = ({ recipientId, limit = 8, offset = 0 }) =>
  httpClient.get(`/${TEAM}/recipients/${recipientId}/reactions/`, { params: { limit, offset } });

/**
 * 리액션 추가 / 감소
 *
 * @param {Object} payload - POST 요청의 Body
 * @param {number|string} payload.recipientId  - **Recipient ID** (필수)
 * @param {string}        payload.emoji        - 이모지 (예: "🎉")
 * @param {'increase'|'decrease'} payload.type - 개수 증감 타입
 *
 * @returns {Promise<{
 *   id: number,
 *   emoji: string,
 *   type: 'increase'|'decrease',
 *   recipient_id: string,
 *   count: number
 * }>}  서버가 반환하는 리액션 결과
 */
export const createRecipientReaction = ({ recipientId, emoji, type }) =>
  httpClient.post(`/${TEAM}/recipients/${recipientId}/reactions/`, {
    emoji,
    type,
  });
