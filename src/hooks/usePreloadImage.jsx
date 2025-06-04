import { useEffect } from 'react';

export const usePreloadImage = (imageUrls) => {
  useEffect(() => {
    if (!Array.isArray(imageUrls)) return;
    imageUrls.forEach((url) => {
      const image = new Image();
      image.src = url;
    });
  }, [imageUrls]);
};
