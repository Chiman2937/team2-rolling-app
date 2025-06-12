// src/pages/MessagePage/MessagePage.jsx

import { useToast } from '@/hooks/useToast';
import { useNavigate, useParams } from 'react-router-dom';
import { useApi } from '@/hooks/useApi';
import { createRecipientMessage } from '@/apis/recipientMessageApi';
import { useForm } from '@/hooks/useForm';
import Textfield from '@/components/Textfield';
import Dropdown from '@/components/Dropdown/Dropdown';
import ProfileSelector from './components/ProfileSelector';
import styles from './MessagePage.module.scss';
import { FONT_OPTIONS, FONT_DROPDOWN_ITEMS } from '@/constants/fontMap';
import { useEffect } from 'react';
import Button from '@/components/Button/Button';
import EditorWrapper from '@/pages/MessagePage/components/EditorWrapper';

// 상대와의 관계 옵션
const RELATIONSHIP_OPTIONS = ['친구', '지인', '동료', '가족'];

function MessagePage() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { id: recipientId } = useParams();

  // 초기 폼 값 설정
  const initialValues = {
    sender: '',
    relationship: RELATIONSHIP_OPTIONS[0],
    profileImageURL: '',
    content: '',
    font: FONT_OPTIONS[0],
  };
  // 유효성 검사 규칙 정의
  const validationRules = {
    sender: [
      { test: (v) => v.trim() !== '', message: '이름은 필수입니다.' },
      { test: (v) => v.trim().length <= 20, message: '이름은 20자 이내입니다.' },
    ],
    content: [
      {
        test: (html) => {
          const div = document.createElement('div');
          div.innerHTML = html;
          const text = div.textContent.replace(/\u00a0/g, '').trim();
          return text.length > 0;
        },
        message: '내용은 필수입니다.',
      },
    ],
  };
  // useForm 훅으로 모든 필드(특히 content) 값을 관리
  const { values, errorMessages, fieldValidity, handleChange, handleBlur, resetForm, isFormValid } =
    useForm(initialValues, validationRules);

  // 메시지 생성 API 호출을 위한 useApi 훅 사용
  const { data, loading, refetch } = useApi(createRecipientMessage, null, {
    errorMessage: '메시지 생성에 실패했습니다. 다시 시도해 주세요.',
    immediate: false,
  });

  useEffect(() => {
    if (data) {
      console.log('메시지 생성 성공:', data);
    }
  }, [data]);

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 폼 유효성 검사
    if (!isFormValid) {
      showToast('모든 필드를 올바르게 입력해 주세요.', 'error');
      return;
    }

    // 이 호출이 성공할 때까지 기다렸다가
    await refetch({
      recipientId,
      ...values,
    });

    // 성공 처리
    showToast('메시지가 성공적으로 생성되었습니다!', 'success');

    resetForm();
    navigate(`/post/${recipientId}`); // 실제 라우트에 맞게 수정
  };

  return (
    <div className={styles['message-page']}>
      <form className={styles['message-page__form']} onSubmit={handleSubmit}>
        {/* 1) From (이름 입력) */}
        <div className={styles['message-page__field']}>
          <label htmlFor='sender-input' className={styles['message-page__label']}>
            From.
          </label>
          <Textfield
            id='sender-input'
            value={values.sender}
            placeholder='이름을 입력해 주세요.'
            onChange={handleChange('sender')}
            onBlur={handleBlur('sender')}
            isValid={fieldValidity.sender}
            message={errorMessages.sender}
            disabled={loading}
          />
        </div>

        {/* 2) 프로필 이미지 선택 */}
        <div className={styles['message-page__field']}>
          <label htmlFor='profile-image' className={styles['message-page__label']}>
            프로필 이미지
          </label>
          <ProfileSelector id='profile-image' onSelectImage={handleChange('profileImageURL')} />
        </div>

        {/* 3) 상대와의 관계 (select) */}
        <div className={styles['message-page__field']}>
          <label htmlFor='relationship' className={styles['message-page__label']}>
            상대와의 관계
          </label>
          <Dropdown
            id='relationship'
            value={values.relationship}
            dropdownItems={RELATIONSHIP_OPTIONS}
            onChange={handleChange('relationship')}
            disabled={loading}
          />
        </div>

        {/* 4) 폰트 선택 (select) */}
        <div className={styles['message-page__field']}>
          <label htmlFor='font' className={styles['message-page__label']}>
            폰트 선택
          </label>
          <Dropdown
            id='font'
            dropdownItems={FONT_DROPDOWN_ITEMS}
            value={values.font}
            onChange={handleChange('font')}
            disabled={loading}
          />
        </div>

        {/* 5) 내용 (laxical Editor) */}
        <div className={styles['message-page__field']}>
          <label htmlFor='content-editor' className={styles['message-page__label']}>
            내용을 입력해 주세요
          </label>
          <EditorWrapper
            inputId='content-editor'
            value={values.content}
            onChange={handleChange('content')}
            onBlur={handleBlur('content')}
            isValid={fieldValidity.content}
            message={errorMessages.content}
            font={values.font}
          />
        </div>

        {/* 6) 전송 버튼 */}
        <div className={styles['message-page__actions']}>
          <Button
            type='submit'
            variant='primary'
            size='stretch'
            className={styles['message-page__submit']}
            disabled={!isFormValid || loading}
          >
            생성하기
          </Button>
        </div>
      </form>
    </div>
  );
}

export default MessagePage;
