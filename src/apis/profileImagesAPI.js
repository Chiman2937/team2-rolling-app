import httpClient from './httpClient';

/**
 * 기본 프로필 이미지 URL 리스트 조회
 * @returns {Promise<string[]>}
 */
export const getProfileImages = () => httpClient.get('/profile-images/');

/**
 * 예상 결과:
 * {
  "imageUrls": [
    "https://learn-codeit-kr-static.s3.ap-northeast-2.amazonaws.com/sprint-proj-image/default_avatar.png",
    "https://picsum.photos/id/522/100/100",
    "https://picsum.photos/id/547/100/100",
    "https://picsum.photos/id/268/100/100",
    "https://picsum.photos/id/1082/100/100",
    "https://picsum.photos/id/571/100/100",
    "https://picsum.photos/id/494/100/100",
    "https://picsum.photos/id/859/100/100",
    "https://picsum.photos/id/437/100/100",
    "https://picsum.photos/id/1064/100/100"
  ]
}
  */
