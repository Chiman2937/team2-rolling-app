import { useEffect } from 'react';

export const useKakaoShare = () => {
  const handleKakaoShare = () => {
    if (!window.Kakao || !window.Kakao.isInitialized()) return;
    const currentUrl = window.location.href;
    const origin = window.location.origin;
    const imageUrl = `${origin}/images/image_opengraph_narrow.png`;
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '🎉 롤링페이퍼가 도착했어요!',
        description: '친구의 따뜻한 메시지를 확인해보세요.',
        imageUrl: imageUrl,
        link: {
          mobileWebUrl: currentUrl,
          webUrl: currentUrl,
        },
      },
      buttons: [
        {
          title: '롤링페이퍼 보러가기',
          link: {
            mobileWebUrl: currentUrl,
            webUrl: currentUrl,
          },
        },
      ],
    });
  };

  useEffect(() => {
    const JS_APP_KEY = import.meta.env.VITE_KAKAO_JS_KEY;
    const kakaoSdkUrl = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.5/kakao.min.js';
    const integrityValue =
      'sha384-dok87au0gKqJdxs7msEdBPNnKSRT+/mhTVzq+qOhcL464zXwvcrpjeWvyj1kCdq6';

    // 이미 로드되었는지 확인
    if (window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(JS_APP_KEY);
      }
      return;
    }

    const script = document.createElement('script');
    script.src = kakaoSdkUrl;
    script.integrity = integrityValue;
    script.crossOrigin = 'anonymous';
    script.onload = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(JS_APP_KEY);
      }
    };
    document.head.appendChild(script);
  }, []);

  return { handleKakaoShare };
};
