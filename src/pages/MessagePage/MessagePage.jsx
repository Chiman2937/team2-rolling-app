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
import Editor from '@/components/Editor/Editor';
import { useEffect } from 'react';

const RELATIONSHIP_OPTIONS = ['친구', '지인', '동료', '가족'];
// ① API 전송용 순수 문자열 배열 (변경하지 않음)
const FONT_OPTIONS = ['Noto Sans', 'Pretendard', '나눔명조', '나눔손글씨 손편지체'];

// ② 폰트 이름 → CSS 변수 매핑
const FONT_CSS_VAR_MAP = {
  'Noto Sans': 'var(--font-family-noto-sans)',
  Pretendard: 'var(--font-family-base)',
  나눔명조: 'var(--font-family-nanum-myeongjo)',
  '나눔손글씨 손편지체': 'var(--font-family-nanum-son-pyeonji)',
};

// ③ Dropdown에 넘길 items
const FONT_DROPDOWN_ITEMS = FONT_OPTIONS.map((fontName) => ({
  value: fontName, // onChange 로 전달될 실제 문자열
  label: fontName, // 화면에 보여줄 텍스트
  style: {
    fontFamily: FONT_CSS_VAR_MAP[fontName], // 각 아이템에 인라인 스타일 적용
  },
}));

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

  // content 필드만 HTML 태그 제거 후 텍스트 길이 > 0 체크
  const validationRules = {
    content: (html) => {
      const div = document.createElement('div');
      div.innerHTML = html;
      // &nbsp; 같은 비문자 공백도 제거
      const text = div.textContent.replace(/\u00a0/g, '').trim();
      return text.length > 0;
    },
  };
  // useForm 훅으로 모든 필드(특히 content) 값을 관리
  const { values, handleChange, resetForm, isFormValid } = useForm(initialValues, validationRules);

  // 메시지 생성 API 호출을 위한 useApi 훅 사용
  const { data, loading, refetch } = useApi(createRecipientMessage, null, {
    errorMessage: '메시지 생성에 실패했습니다. 다시 시도해 주세요.',
    immediate: false,
  });

  // Dropdown 에 넘길 폰트 목록 (값 + 표시 레이블 + 인라인 스타일)
  const fontItems = FONT_OPTIONS.map((font) => ({
    value: font,
    label: font,
    style: { fontFamily: font },
  }));

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
            dropdownItems={fontItems}
            value={values.font}
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
