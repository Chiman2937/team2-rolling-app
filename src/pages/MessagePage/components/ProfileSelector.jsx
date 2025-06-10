import React, { useState, useEffect, useMemo } from 'react';
import { useApi } from '@/hooks/useApi';
import { getProfileImages } from '@/apis/profileImagesApi';
import ImagePreloader from '@/components/ImagePreloader';
import styles from './ProfileSelector.module.scss';
import AVATAR_PLACEHOLDER from '@/assets/images/image_profile_default.svg';
import HorizontalScrollContainer from '@/components/HorizontalScrollContainer/HorizontalScrollContainer';
import GradientImage from '@/components/GradientImage/GradientImage';

function ProfileSelector({ onSelectImage }) {
  //  프로필 이미지 목록 가져오기 (API 호출)
  const { data: imageData, loading } = useApi(getProfileImages);

  useEffect(() => {
    if (!loading && imageData) {
      console.log('🌐 [FETCH] 프로필 이미지 URL 목록 도착', imageData);
    }
  }, [loading, imageData]);
  // imageData가 배열이 아닐 경우 빈 배열로 초기화
  const imageUrls = useMemo(() => {
    return Array.isArray(imageData?.imageUrls) ? imageData.imageUrls : [];
  }, [imageData]);

  useEffect(() => {
    if (imageUrls.length) {
      console.log('🖼️ [RENDER] <img> 요소 렌더링 시작', imageUrls);
    }
  }, [imageUrls]);
  // 선택된 이미지 URL 상태
  const [selectedUrl, setSelectedUrl] = useState('');

  // 로딩 후, 선택된 이미지 URL이 없으면 첫 번째 URL을 기본값으로 설정
  useEffect(() => {
    if (!loading && imageUrls.length > 0 && !selectedUrl) {
      // 아직 선택된 값이 없으면 첫 번째 URL을 기본값으로
      setSelectedUrl((prev) => prev || imageUrls[0]);
      onSelectImage && onSelectImage(imageUrls[0]);
    }
  }, [loading, imageUrls, selectedUrl, onSelectImage]);

  const handleImageSelect = (url) => {
    setSelectedUrl(url);
    onSelectImage && onSelectImage(url);
  };

  return (
    <div className={styles['profile-selector']}>
      {/* 백그라운드에서 모든 이미지 미리 로드 */}
      <ImagePreloader imageUrls={imageUrls} />
      {/* 현재 선택된 이미지를 보여주는 영역 */}
      <div className={styles['profile-selector__preview-container']}>
        <GradientImage
          src={selectedUrl || AVATAR_PLACEHOLDER}
          alt='선택된 프로필'
          className={styles['profile-selector__preview']}
        />
      </div>

      {/* 이미지 리스트 */}
      <div className={styles['profile-selector__images-container']}>
        <label className={styles['profile-selector__label']}>프로필 이미지를 선택해주세요!</label>
        <HorizontalScrollContainer className={styles['profile-selector__images']}>
          {imageUrls.map((url, idx) => {
            const isSelected = url === selectedUrl;

            return (
              <GradientImage
                key={url}
                src={url}
                alt={`프로필 썸네일 ${idx + 1}`}
                className={
                  isSelected
                    ? styles['profile-selector__image-selected']
                    : styles['profile-selector__image']
                }
                onClick={() => handleImageSelect(url)}
                draggable='false'
              />
            );
          })}
        </HorizontalScrollContainer>
      </div>
    </div>
  );
}

export default ProfileSelector;
