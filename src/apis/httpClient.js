import axios from 'axios';

/**
 * 공용 Axios 인스턴스
 *  - baseURL·timeout·기본 헤더 설정
 *  - 응답 인터셉터: .data 언래핑 + 공통 에러 메시지 변환
 */
const httpClient = axios.create({
  baseURL: 'https://rolling-api.vercel.app',
  timeout: 10_000,
  headers: { 'Content-Type': 'application/json' },
});

/* ---------- response interceptor ---------- */
httpClient.interceptors.response.use(
  (res) => res.data,
  (error) => {
    if (!error.response) {
      return Promise.reject(
        new Error('네트워크 오류가 발생했습니다. 인터넷 연결을 확인해 주세요.'),
      );
    }

    const { status, data } = error.response;
    let msg = data?.message ?? '요청 처리 중 오류가 발생했습니다.';

    if (status >= 500) msg = '서버 오류입니다. 잠시 후 다시 시도해 주세요.';
    else if (status === 404) msg = '요청한 리소스를 찾을 수 없습니다.';
    else if (status === 400) msg = '잘못된 요청입니다. 입력값을 확인해 주세요.';

    return Promise.reject(new Error(msg));
  },
);

export default httpClient;
