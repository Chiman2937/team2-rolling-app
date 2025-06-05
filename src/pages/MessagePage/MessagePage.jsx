// src/pages/MessagePage/MessagePage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Textfield from '@/components/Textfield';
import ImagePreloader from '@/components/ImagePreloader';
import styles from './MessagePage.module.scss';
import { useApi } from '@/hooks/useApi';
import { getProfileImages } from '@/apis/profileImagesApi';
import { createRecipientMessage } from '@/apis/recipientMessageApi';
import { useToast } from '@/hooks/useToast';

const RELATIONSHIP_OPTIONS = ['친구', '지인', '동료', '가족'];
const FONT_OPTIONS = ['Noto Sans', 'Pretendard', '나눔명조', '나눔손글씨 손편지체'];

function MessagePage({ id }) {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const recipientId = id;

  // --- 입력값 상태 ---
  const [senderName, setSenderName] = useState('');
  const [profileImages, setProfileImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState('');
  const [relationship, setRelationship] = useState(RELATIONSHIP_OPTIONS[0]);
  const [content, setContent] = useState(''); // 이제 이 setContent 를 <textarea> 에 연결
  const [font, setFont] = useState(FONT_OPTIONS[0]);

  // --- 프로필 이미지 목록 가져오기 (API 호출) ---
  const { data: imageData, loading: loadingImages, error: errorImages } = useApi(getProfileImages);

  useEffect(() => {
    if (imageData && Array.isArray(imageData.imageUrls)) {
      setProfileImages(imageData.imageUrls);
      setSelectedImage(imageData.imageUrls[0] || '');
    }
  }, [imageData]);

  // --- 이미지 선택 핸들러 ---
  const handleImageClick = (url) => {
    setSelectedImage(url);
  };

  // --- 메시지 전송 핸들러 ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!senderName.trim()) {
      showToast({ type: 'fail', message: '이름을 입력해주세요.', timer: 2000 });
      return;
    }
    if (!content.trim()) {
      showToast({ type: 'fail', message: '내용을 입력해주세요.', timer: 2000 });
      return;
    }
    if (!selectedImage) {
      showToast({ type: 'fail', message: '프로필 이미지를 선택해주세요.', timer: 2000 });
      return;
    }

    try {
      await createRecipientMessage({
        recipientId: Number(recipientId),
        sender: senderName,
        profileImageURL: selectedImage,
        relationship,
        content,
        font,
      });

      showToast({ type: 'success', message: '메시지가 성공적으로 전송되었습니다!', timer: 2000 });
      navigate(`/recipients/${recipientId}`);
    } catch (err) {
      showToast({ type: 'fail', message: err.message, timer: 2000 });
    }
  };

  return (
    <div className={styles['message-page']}>
      <h1 className={styles['message-page__title']}>메시지 작성</h1>

      {/* 프로필 이미지 배열이 준비되면 미리 로딩 */}
      {Array.isArray(profileImages) && profileImages.length > 0 && (
        <ImagePreloader imageUrls={profileImages} />
      )}

      <form className={styles['message-page__form']} onSubmit={handleSubmit}>
        {/* 1) From. (이름 입력) */}
        <div className={styles['message-page__field']}>
          <label htmlFor='senderName' className={styles['message-page__label']}>
            From.
          </label>
          <Textfield
            value={senderName}
            placeholder='이름을 입력해 주세요.'
            onChange={setSenderName}
            isValid={true}
            message=''
            disabled={false}
          />
        </div>

        {/* 2) 프로필 이미지 선택 */}
        <div className={styles['message-page__field']}>
          <label className={styles['message-page__label']}>프로필 이미지</label>
          {loadingImages && <p>이미지 로딩 중...</p>}
          {errorImages && (
            <p className={styles['message-page__error']}>
              이미지를 불러오는 중 오류가 발생했습니다.
            </p>
          )}

          <div className={styles['message-page__image-list']}>
            {profileImages.map((url) => (
              <button
                type='button'
                key={url}
                className={`${styles['message-page__image-item']} ${
                  selectedImage === url ? styles['message-page__image-item--selected'] : ''
                }`}
                onClick={() => handleImageClick(url)}
              >
                <img src={url} alt='프로필' className={styles['message-page__image-thumb']} />
              </button>
            ))}
          </div>
        </div>

        {/* 3) 상대와의 관계 (select) */}
        <div className={styles['message-page__field']}>
          <label htmlFor='relationship' className={styles['message-page__label']}>
            상대와의 관계
          </label>
          <select
            id='relationship'
            value={relationship}
            onChange={(e) => setRelationship(e.target.value)}
            className={styles['message-page__select']}
          >
            {RELATIONSHIP_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* 4) 내용 (textarea로 대체) */}
        <div className={styles['message-page__field']}>
          <label className={styles['message-page__label']}>내용을 입력해 주세요</label>
          <div className={styles['message-page__editor-wrapper']}>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder='내용을 입력하세요.'
              className={styles['message-page__textarea']}
            />
          </div>
        </div>

        {/* 5) 폰트 선택 (select) */}
        <div className={styles['message-page__field']}>
          <label htmlFor='font' className={styles['message-page__label']}>
            폰트 선택
          </label>
          <select
            id='font'
            value={font}
            onChange={(e) => setFont(e.target.value)}
            className={styles['message-page__select']}
          >
            {FONT_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* 6) 전송 버튼 */}
        <div className={styles['message-page__actions']}>
          <button type='submit' className={styles['message-page__submit']}>
            생성하기
          </button>
        </div>
      </form>
    </div>
  );
}

export default MessagePage;
