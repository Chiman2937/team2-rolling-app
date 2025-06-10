import { getColorFromCloudinaryImageUrl } from './getColorFromCloudinaryImageUrl';

export const getBackgroundStylesFromPostData = ({ backgroundColor, backgroundImageURL }) => {
  let backgroundStyle = {
    backgroundColor: 'none',
    backgroundImage: 'none',
    backgroundRepeat: 'no-repeaet',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  };

  if (!backgroundImageURL) {
    backgroundStyle.backgroundColor = `var(--color-${backgroundColor}-200)`;
  } else {
    const urlObj = new URL(backgroundImageURL);
    const parts = urlObj.pathname.split('/'); // ['','dxho7f5dm','image','upload','v1749409044','colors','6a6a6a.png']
    const folderCandidate = parts[5]; // public_id 시작 부분 (index 5)
    if (folderCandidate === 'colors') {
      const imageHexColor = getColorFromCloudinaryImageUrl(backgroundImageURL);
      backgroundStyle.backgroundColor = imageHexColor;
    } else if (folderCandidate === 'images') {
      backgroundStyle.backgroundImage = `url(${backgroundImageURL})`;
    } else {
      backgroundStyle.backgroundImage = `url(${backgroundImageURL})`;
    }
  }

  return backgroundStyle;
};
