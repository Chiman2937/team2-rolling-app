import { useState, useEffect, useCallback, useRef } from 'react';
import { useToast } from '@/hooks/useToast';

/**
 * 비동기 API 호출을 캡슐화해
 *  - loading / data / error 상태를 관리하고
 *  - 실패 시 Toast 를 띄우는 범용 훅
 *
 *@template T
 * @param {(p?: any) => Promise<T>} apiFn         실제 API 함수 (고정 참조)
 * @param {any}                     [params={}]   API 파라미터 (없으면 빈 객체)
 * @param {Object}                  [options]   추가 옵션들
 * @param {string}                  [options.errorMessage]  실패 토스트 문구
 * @param {number}                  [options.retry=0]       실패 자동 재시도 횟수
 * @param {boolean}                 [options.immediate=true] 마운트 시 자동 호출 여부
 *       true면 컴포넌트 마운트 시 자동으로 API를 호출하고, 이후에 refetch 함수를 수동으로 호출해야 함(예: 재시도)
 *      false면 첫 요청부터 refetch 함수를 수동으로 호출해야 함(예: 버튼 클릭,  입력 값 변경 등)
 * @returns {{
 *   data: T|null,  // API 호출 결과 데이터
 *   loading: boolean,  // API 호출 중 로딩 상태
 *   error: Error|null, // API 호출 중 발생한 에러
 *   refetch: () => Promise<void> // API 재호출 함수
 * }}
 */
export const useApi = (apiFn, params = {}, { errorMessage, immediate = true, retry = 0 } = {}) => {
  const { showToast } = useToast();

  if (typeof apiFn !== 'function') {
    throw new Error('useApi 첫 번째 인자는 함수여야 합니다.');
  }
  if (apiFn.length > 1) {
    // 함수 선언 시 이미 매개변수가 존재한다면 오류를 던집니다.
    throw new Error(
      'useApi에 전달된 apiFn 함수는 매개변수를 2개 이상 선언할 수 없습니다. ' +
        '“객체 하나”만 받아야 하며, 그 객체는 useApi 두 번째 인자로만 넘겨주세요.',
    );
  }

  /** 고정 참조 보존 */
  const apiRef = useRef(apiFn);
  const paramsRef = useRef(params);
  const execRef = useRef(() => {});

  /** state */
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  /** 실행 로직 */
  const execute = useCallback(
    async (attempt = 0) => {
      setLoading(true);
      setError(null);
      try {
        const res = await apiRef.current(paramsRef.current);
        setData(res);
      } catch (err) {
        if (attempt < retry) {
          execute(attempt + 1); // 재귀 재시도
          return;
        }
        setError(err);
        showToast({
          type: 'fail',
          message: errorMessage ?? err.message,
          timer: 2000,
        });
      } finally {
        setLoading(false);
      }
    },
    [errorMessage, retry, showToast],
  );

  /* --- 최신 execute 를 ref 에 보존 --- */
  execRef.current = execute;

  /**
   *  외부에서 호출하는 refetch
   *  이 함수는 API를 재호출하는 역할을 합니다.(파라미터 변경 가능)
   */
  const refetch = useCallback(async (nextParams = paramsRef.current) => {
    paramsRef.current = nextParams;
    await execRef.current();
  }, []);

  /** 처음 한 번만 실행 */
  useEffect(() => {
    if (immediate) execRef.current();
  }, [immediate]);

  return { data, loading, error, refetch };
};
