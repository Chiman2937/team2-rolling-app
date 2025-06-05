/**
 * 주어진 날짜(createdAt)를 기준으로 오늘인지, 며칠 전인지 계산하여 문자열로 반환합니다.
 *
 * @param {string | Date} createdAt - ISO 문자열 또는 Date 객체
 * @returns {string}
 *   - 만약 diffDays <= 0 이면 "오늘"
 *   - 아니면 "{diffDays}일 전"
 */
export function getDaysAgo(createdAt) {
  // Date 객체로 변환
  const createdDate = typeof createdAt === 'string' ? new Date(createdAt) : createdAt;
  if (!(createdDate instanceof Date) || isNaN(createdDate)) {
    // 유효하지 않은 날짜가 들어오면 빈 문자열 반환
    return '';
  }

  const now = new Date();
  // 밀리초 차이 계산
  const diffMs = now.getTime() - createdDate.getTime();
  // 하루(24h = 1000 * 60 * 60 * 24) 기준으로 일 수 계산
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  return diffDays <= 0 ? '오늘' : `${diffDays}일 전`;
}
