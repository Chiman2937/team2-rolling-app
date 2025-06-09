//이미지 Url을 읽어와 이미지 type인지, 컬러 type인지 검사합니다.
//cloudinary 경로이고 colors 폴더에 저장된 사진이라면 'colors'
//cloudinary 경로이고 images 폴더에 저장된 사진이라면 'images'
//그 외 경로이면 'images',
//null 이면 null을 반환합니다
export const getIsImageOrColor = (url) => {
  if (!url) return null;
  const urlObj = new URL(url);
  const parts = urlObj.pathname.split('/'); // ['','dxho7f5dm','image','upload','v1749409044','colors','6a6a6a.png']
  const folderCandidate = parts[5]; // public_id 시작 부분 (index 5)
  if (folderCandidate === 'colors' || folderCandidate === 'images') {
    return folderCandidate;
  } else {
    return 'images'; // 기본값
  }
};
