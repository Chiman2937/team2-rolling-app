// src/pages/MessagePage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Textfield from '@/components/Textfield';
import Editor from '@/components/Editor'; // 리치 텍스트 에디터 컴포넌트
import styles from './MessagePage.module.scss';
import { useApi } from '@/hooks/useApi';
import { getProfileImages } from '@/api/profileImagesApi';
import { createRecipientMessage } from '@/api/recipientMessageApi';
import { useToast } from '@/hooks/useToast';

const RELATIONSHIP_OPTIONS = ['친구', '지인', '동료', '가족'];
const FONT_OPTIONS = ['Noto Sans', 'Pretendard', '나눔명조', '나눔손글씨 손편지체'];

export default function MessagePage() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  // URL에 recipientId가 포함되어 있다고 가정 (예: /recipients/:recipientId/message)
  const { recipientId } = useParams();

  // --- 각 입력값 상태관리 ---
  const [senderName, setSenderName] = useState('');
  const [profileImages, setProfileImages] = useState([]); // API 에서 받아올 이미지 URL 배열
  const [selectedImage, setSelectedImage] = useState(''); // 선택된 프로필 이미지 URL
  const [relationship, setRelationship] = useState(RELATIONSHIP_OPTIONS[0]);
  const [content, setContent] = useState(''); // 에디터(본문) 내용
  const [font, setFont] = useState(FONT_OPTIONS[0]);

  // --- 프로필 이미지 목록 가져오기 (API 호출) ---
  const { data: imageData, loading: loadingImages, error: errorImages } = useApi(getProfileImages);

  useEffect(() => {
    if (imageData && Array.isArray(imageData.imageUrls)) {
      setProfileImages(imageData.imageUrls);
      // 초기 선택은 첫 번째 이미지로 (원한다면 빈 문자열로 둘 수도 있음)
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

    // 유효성 검사 (필수값 체크) — 필요에 따라 더 촘촘히 검증
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

      // 전송 후 다른 페이지로 이동하거나 초기화
      navigate(`/recipients/${recipientId}`); // 예: 수신자 상세 페이지로 돌아가기
    } catch (err) {
      showToast({ type: 'fail', message: err.message, timer: 2000 });
    }
  };

  return (
    <div className={styles['message-page']}>
      <h1 className={styles['message-page__title']}>메시지 작성</h1>

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
            {/* 원형 썸네일 형태로 렌더링 */}
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

        {/* 4) 내용 (Editor) */}
        <div className={styles['message-page__field']}>
          <label className={styles['message-page__label']}>내용을 입력해 주세요</label>
          <div className={styles['message-page__editor-wrapper']}>
            <Editor value={content} onChange={setContent} placeholder='내용을 입력하세요.' />
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
