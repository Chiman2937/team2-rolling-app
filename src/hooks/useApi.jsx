import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/useToast';

/**
 * 비동기 API 호출을 캡슐화해
 *  - loading / data / error 상태를 관리하고
 *  - 실패 시 Toast 를 띄우는 범용 훅
 *
 * @template T
 * @param {() => Promise<T>} fetcher        실제 API 함수(src/apis/... 를 호출)
 * @param {Object}           options 확장성을 위한 옵션 객체 retry 등
 * @param {string}           options.errorMessage  실패 토스트에 노출할 메시지
 * @param {boolean}          [options.immediate=true]  마운트 시 자동 호출 여부
 *       true면 컴포넌트 마운트 시 자동으로 API를 호출하고, 이후에 refetch 함수를 수동으로 호출해야 함(예: 재시도)
 *      false면 첫 요청부터 refetch 함수를 수동으로 호출해야 함(예: 버튼 클릭,  입력 값 변경 등)
 * @returns {{
 *   data: T|null,  // API 호출 결과 데이터
 *   loading: boolean,  // API 호출 중 로딩 상태
 *   error: Error|null, // API 호출 중 발생한 에러
 *   refetch: () => Promise<void> // API 재호출 함수
 * }}
 */
export function useApi(fetcher, { errorMessage, immediate = true } = {}) {
  const { showToast } = useToast();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  /** API 재호출 함수 */
  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetcher();
      setData(result);
    } catch (err) {
      setError(err);
      // 실패 토스트
      showToast({ type: 'fail', message: errorMessage ?? err.message, timer: 1000 });
    } finally {
      setLoading(false);
    }
  }, [fetcher, showToast, errorMessage]);

  // immediate 옵션이 true면 마운트 시 한 번 호출
  useEffect(() => {
    if (immediate) refetch();
  }, [immediate, refetch]);

  return { data, loading, error, refetch };
}
