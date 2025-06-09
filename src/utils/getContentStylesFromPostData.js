import { getColorFromCloudinaryImageUrl } from './getColorFromCloudinaryImageUrl';
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
      const imageHexColor = getColorFromCloudinaryImageUrl(backgroundImageURL);
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
