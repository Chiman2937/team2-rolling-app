import { getColorFromCloudinaryImageUrl } from './getColorFromCloudinaryImageUrl';
import { getIsColorDark } from './getIsColorDark';

export const getIsCardDarkFromPostData = (backgroundImageURL) => {
  if (!backgroundImageURL) {
    return false;
  } else {
    const urlObj = new URL(backgroundImageURL);
    const parts = urlObj.pathname.split('/'); // ['','dxho7f5dm','image','upload','v1749409044','colors','6a6a6a.png']
    const folderCandidate = parts[5]; // public_id 시작 부분 (index 5)
    if (folderCandidate === 'colors') {
      const imageHexColor = getColorFromCloudinaryImageUrl(backgroundImageURL);
      const isColorDark = getIsColorDark(imageHexColor);
      if (isColorDark) {
        return true;
      } else {
        return false;
      }
    } else if (folderCandidate === 'images') {
      return true;
    } else {
      return true;
    }
  }
};
