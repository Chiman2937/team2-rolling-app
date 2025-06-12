import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useApi } from '@/hooks/useApi';
import { getProfileImages } from '@/apis/profileImagesApi';
import ImagePreloader from '@/components/ImagePreloader';
import styles from './ProfileSelector.module.scss';
import AVATAR_PLACEHOLDER from '@/assets/images/image_profile_default.svg';
import HorizontalScrollContainer from '@/components/HorizontalScrollContainer/HorizontalScrollContainer';
import GradientImage from '@/components/GradientImage/GradientImage';
import LoadingLabel from '@/components/LoadingLabel/LoadingLabel';
import Button from '@/components/Button/Button';
import { uploadImageToCloudinary } from '@/apis/syncApi/uploadImageToCloudinary';
import { useToast } from '@/hooks/useToast';

/**
 * 프로필 이미지 선택기
 * @param {Object} param0
 * @param {Function} param0.onSelectImage - 이미지 선택 시 호출되는 콜백
 * @returns {JSX.Element}
 */

function ProfileSelector({ onSelectImage }) {
  const { showToast } = useToast();
  //  프로필 이미지 목록 가져오기 (API 호출)
  const { data: imageData, loading } = useApi(getProfileImages);
  // imageData가 배열이 아닐 경우 빈 배열로 초기화
  const apiImageUrls = useMemo(() => {
    return Array.isArray(imageData?.imageUrls) ? imageData.imageUrls : [];
  }, [imageData]);

  // 선택된 이미지 URL 상태
  const [selectedUrl, setSelectedUrl] = useState('');
  // 로딩된 이미지 개수 상태
  const [loadedCount, setLoadedCount] = useState(0);
  // 모든 이미지가 로드되었는지 여부
  const allLoaded = apiImageUrls.length > 0 && loadedCount >= apiImageUrls.length;

  /* ---------------- 사용자 업로드 이미지 ---------------- */
  const [uploading, setUploading] = useState(false); // 업로드 진행 여부
  const fileInputRef = useRef(null);

  // 로딩 후, 선택된 이미지 URL이 없으면 첫 번째 URL을 기본값으로 설정
  useEffect(() => {
    if (!loading && apiImageUrls.length > 0 && !selectedUrl) {
      // 아직 선택된 값이 없으면 첫 번째 URL을 기본값으로
      setSelectedUrl((prev) => prev || apiImageUrls[0]);
      onSelectImage && onSelectImage(apiImageUrls[0]);
    }
  }, [loading, apiImageUrls, selectedUrl, onSelectImage]);

  const handleImageSelect = (url) => {
    setSelectedUrl(url);
    onSelectImage && onSelectImage(url);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드할 수 있습니다.');
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    setSelectedUrl(previewUrl);
    onSelectImage?.(previewUrl);
    setUploading(true);
    // Cloudinary 업로드 시작
    try {
      const uploadedUrl = await uploadImageToCloudinary(file);
      setSelectedUrl(uploadedUrl);
      onSelectImage?.(uploadedUrl);
    } catch (err) {
      console.error(err);
      showToast?.({
        type: 'fail',
        message: '프로필 이미지 업로드에 실패했습니다.',
      });
      setSelectedUrl('');
      onSelectImage?.('');
    } finally {
      setUploading(false);
      URL.revokeObjectURL(previewUrl);
      e.target.value = '';
    }
  };

  const handleThumbLoad = () => setLoadedCount((c) => c + 1);
  const uploadBtnClick = () => {
    if (uploading) return; // 업로드 중이면 무시
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // *** 핵심: 값 초기화 ***
      fileInputRef.current.click(); // 파일 다이얼로그 오픈
    }
  };

  return (
    <div className={styles['profile-selector__container']}>
      <div className={styles['profile-selector']}>
        {/* 백그라운드에서 모든 이미지 미리 로드 */}
        <ImagePreloader imageUrls={apiImageUrls} />
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
          <LoadingLabel
            loading={!allLoaded}
            loadingText={uploading ? '이미지 업로드 중...' : '프로필 리스트 로딩 중...'}
            loadedText='프로필 이미지를 선택해주세요!'
            className={styles['profile-selector__label']}
          />
          <HorizontalScrollContainer className={styles['profile-selector__images']}>
            {apiImageUrls.map((url, idx) => {
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
                  onLoaded={handleThumbLoad}
                />
              );
            })}
          </HorizontalScrollContainer>
        </div>
      </div>
      <input
        style={{ display: 'none' }}
        type='file'
        accept='image/*'
        ref={fileInputRef}
        onChange={handleFileChange}
        disabled={uploading}
      />

      <Button
        variant='outlined'
        type='button'
        size={36}
        onClick={uploadBtnClick}
        disabled={uploading}
      >
        내 프로필 업로드
      </Button>
    </div>
  );
}

export default ProfileSelector;
