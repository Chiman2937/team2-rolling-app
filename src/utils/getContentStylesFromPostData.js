import { getIsColorDark } from './getIsColorDark';

export const getContentStylesFromPostData = (backgroundImageURL) => {
  const contentNormalColorStyle = {};

  const contentDarkColorStyle = {
    color: `var(--color-white)`,
  };

  const contentImageStyle = {
    color: `var(--color-white)`,
    background: `linear-gradient(180deg, rgba(0, 0, 0, 0.54) 0%, rgba(0, 0, 0, 0.54) 100%)`,
  };

  if (!backgroundImageURL) {
    return contentNormalColorStyle;
  } else {
    const urlObj = new URL(backgroundImageURL);
    const parts = urlObj.pathname.split('/'); // ['','dxho7f5dm','image','upload','v1749409044','colors','6a6a6a.png']
    const folderCandidate = parts[5]; // public_id 시작 부분 (index 5)
    if (folderCandidate === 'colors') {
      const imageHexColor = getColorFromCloudinaryImage(backgroundImageURL);
      const isDark = getIsColorDark(imageHexColor);
      if (isDark) {
        return contentDarkColorStyle;
      }
    } else if (folderCandidate === 'images') {
      return contentImageStyle;
    } else {
      return contentImageStyle;
    }
  }
};

//cloudinary 파일명에서 색상을 읽어옵니다.
//ex. ...colors/131313.svg는 #131313 입니다.
const getColorFromCloudinaryImage = (url) => {
  if (!url) return null;
  const urlObj = new URL(url);
  const parts = urlObj.pathname.split('/'); // ['','dxho7f5dm','image','upload','v1749409044','colors','6a6a6a.png']
  const isHexColor = (str) => /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(str);
  const fileName = parts[6];
  if (!fileName) return null;
  const hexString = '#' + fileName.substring(0, 6); // public_id 시작 부분 (index 5)
  if (isHexColor(hexString)) {
    return hexString;
  } else {
    return null; // 기본값
  }
};
