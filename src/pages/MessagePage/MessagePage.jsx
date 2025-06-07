// src/pages/MessagePage/MessagePage.jsx

import React from 'react';
import { useToast } from '@/hooks/useToast';
import { useNavigate, useParams } from 'react-router-dom';
import { useApi } from '@/hooks/useApi';
import { createRecipientMessage } from '@/apis/recipientMessageApi';
import { useForm } from '@/hooks/useForm';
import Textfield from '@/components/Textfield';
import Dropdown from '@/components/Dropdown';
import ProfileSelector from './components/ProfileSelector';
import styles from './MessagePage.module.scss';

// 방금 만든 Editor 컴포넌트를 가져옵니다.
import Editor from '@/components/Editor/Editor';

const RELATIONSHIP_OPTIONS = ['친구', '지인', '동료', '가족'];
const FONT_OPTIONS = ['Noto Sans', 'Pretendard', '나눔명조', '나눔손글씨 손편지체'];

function MessagePage() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { id: recipientId } = useParams();

  // useForm 훅으로 모든 필드(특히 content) 값을 관리
  const { values, handleChange, resetForm, isFormValid } = useForm({
    sender: '',
    relationship: RELATIONSHIP_OPTIONS[0],
    profileImageURL: '',
    content: '', // 여기서 Tiptap Editor의 HTML이 계속 업데이트됩니다.
    font: FONT_OPTIONS[0],
  });
  // 메시지 생성 API 호출을 위한 useApi 훅 사용
  const { data, loading, error, refetch } = useApi(createRecipientMessage, null, {
    errorMessage: '메시지 생성에 실패했습니다. 다시 시도해 주세요.',
    immediate: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      showToast('모든 필드를 올바르게 입력해 주세요.', 'error');
      return;
    }
    refetch({
      recipientId,
      ...values,
    });
    if (loading) {
      showToast('메시지를 생성하는 중입니다...', 'info');
    }
    if (error) {
      resetForm();
    }

    if (data) {
      showToast('메시지가 성공적으로 생성되었습니다!', 'success');
      console.log('생성된 메시지:', data);
      resetForm(); // 폼 초기화
      // 메시지 생성 후, 메시지 목록 페이지로 이동
      navigate(`/post/${recipientId}`);
    }
  };

  return (
    <div className={styles['message-page']}>
      <form className={styles['message-page__form']} onSubmit={handleSubmit}>
        {/* 1) From (이름 입력) */}
        <div className={styles['message-page__field']}>
          <label htmlFor='senderName' className={styles['message-page__label']}>
            From.
          </label>
          <Textfield
            value={values.sender}
            placeholder='이름을 입력해 주세요.'
            onChange={handleChange('sender')}
            isValid={true}
            message='이름은 필수 입력 사항입니다.'
            disabled={loading}
          />
        </div>

        {/* 2) 프로필 이미지 선택 */}
        <div className={styles['message-page__field']}>
          <label className={styles['message-page__label']}>프로필 이미지</label>
          <ProfileSelector onSelectImage={handleChange('profileImageURL')} />
        </div>

        {/* 3) 상대와의 관계 (select) */}
        <div className={styles['message-page__field']}>
          <label htmlFor='relationship' className={styles['message-page__label']}>
            상대와의 관계
          </label>
          <Dropdown
            value={values.relationship}
            dropdownItems={RELATIONSHIP_OPTIONS}
            onChange={handleChange('relationship')}
            disabled={loading}
          />
        </div>

        {/* 4) 내용 (laxical Editor) */}
        <div className={styles['message-page__field']}>
          <label className={styles['message-page__label']}>내용을 입력해 주세요</label>
          <div className={styles['message-page__editor-wrapper']}>
            {/* 
              Editor 컴포넌트에 content(HTML)와 onUpdate 콜백을 전달:
              onUpdate(html) → handleChange('content')(html) 형태로 폼 값이 갱신됩니다.
            */}
            <Editor content={values.content} onUpdate={handleChange('content')} />
          </div>
        </div>

        {/* 5) 폰트 선택 (select) */}
        <div className={styles['message-page__field']}>
          <label htmlFor='font' className={styles['message-page__label']}>
            폰트 선택
          </label>
          <Dropdown
            value={values.font}
            dropdownItems={FONT_OPTIONS}
            onChange={handleChange('font')}
            disabled={loading}
          />
        </div>

        {/* 6) 전송 버튼 */}
        <div className={styles['message-page__actions']}>
          <button
            type='submit'
            className={styles['message-page__submit']}
            disabled={!isFormValid || loading}
          >
            생성하기
          </button>
        </div>
      </form>
    </div>
  );
}

export default MessagePage;
