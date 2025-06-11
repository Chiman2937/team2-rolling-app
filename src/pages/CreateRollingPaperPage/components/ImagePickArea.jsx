import styles from './ImagePickArea.module.scss';
import { useEffect, useRef, useState } from 'react';
import { useApi } from '@/hooks/useApi';
import { getBackgroundImages } from '@/apis/backgroundImagesApi';
import AddItemButton from './AddItemButton';
import ImageSwatch from './ImageSwatch';

const ImagePickArea = ({ formDataChange, setNewImageFileObject, showImagePickArea }) => {
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [customImageFileList, setCustomImageFileList] = useState([]);
  const [customImagePreviewUrlList, setCustomImagePreviewUrlList] = useState([]);
  const fileInputRef = useRef();

  // Api 호출
  const {
    data: backgroundUrlData,
    loading: isDataLoading,
    // error: getError,
  } = useApi(getBackgroundImages, { immediate: true });

  const handleInputFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드할 수 있습니다.');
      return;
    }

    const newUrl = URL.createObjectURL(file);

    setCustomImageFileList((prev) => {
      const next = [file, ...prev];
      return next.slice(0, 3);
    });

    setCustomImagePreviewUrlList((prev) => {
      const next = [newUrl, ...prev];
      if (next.length > 3) {
        const urlToRevoke = next[next.length - 1];
        URL.revokeObjectURL(urlToRevoke);
      }
      handleImageSelect(next[0]);
      return next.slice(0, 3);
    });
  };

  const backgroundImageURL = backgroundUrlData?.imageUrls || [];

  const handleImageSelect = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
    formDataChange('backgroundImageURL', imageUrl);
    if (customImagePreviewUrlList.includes(imageUrl)) {
      const customImageIndex = customImagePreviewUrlList.indexOf(imageUrl);
      setNewImageFileObject(customImageFileList[customImageIndex]);
    } else {
      setNewImageFileObject(null);
    }
  };

  const handleAddButtonClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    if (!showImagePickArea) {
      setSelectedImageUrl(null);
      setNewImageFileObject(null);
    } else {
      handleImageSelect(backgroundImageURL[0]);
    }
  }, [showImagePickArea]);

  return (
    <div
      className={styles['color-pick-area__container']}
      style={showImagePickArea ? {} : { display: 'none' }}
    >
      {/* 기본 색상 선택 팔레트 */}
      <label className={styles['color-pick-area__label']}>기본 이미지</label>
      <div className={styles['color-pick-area__palette']}>
        {isDataLoading &&
          new Array(4).fill(0).map((_, i) => {
            return <ImageSwatch.default key={i} />;
          })}
        {backgroundImageURL.length > 0 &&
          backgroundImageURL.map((imageUrl) => {
            if (!imageUrl) return;
            return (
              <ImageSwatch
                key={imageUrl}
                imageUrl={imageUrl}
                selectedImageUrl={selectedImageUrl}
                onImageSelect={handleImageSelect}
              />
            );
          })}
      </div>
      {/* 커스텀 색상 선택 팔레트 */}
      <label className={styles['color-pick-area__label']}>다른 이미지 선택하기</label>
      <div className={styles['color-pick-area__palette']}>
        <input
          style={{ display: 'none' }}
          type='file'
          accept='image/*'
          ref={fileInputRef}
          onChange={handleInputFileChange}
        />
        <AddItemButton onClick={handleAddButtonClick} />
        {customImagePreviewUrlList.map((imageUrl) => {
          if (!imageUrl) return;
          return (
            <ImageSwatch
              key={imageUrl}
              imageUrl={imageUrl}
              selectedImageUrl={selectedImageUrl}
              onImageSelect={handleImageSelect}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ImagePickArea;
