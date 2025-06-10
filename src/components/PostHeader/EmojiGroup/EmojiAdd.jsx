// src/components/EmojiAdd/EmojiAdd.jsx

import { useApi } from '@/hooks/useApi';
import DropdownButton from '@/components/DropdownButton/DropdownButton';
//import IconButton from '@/components/Button/IconButton';
import AddImojiIcon from '@/assets/icons/add-20.svg';
import EmojiPicker from 'emoji-picker-react';
import Style from './EmojiAdd.module.scss';
import { createRecipientReaction } from '@/apis/recipientReactionsApi';
import { useToast } from '@/hooks/useToast';
import Button from '@/components/Button/Button';
import { DEVICE_TYPES } from '@/constants/deviceType';
import { useDeviceType } from '@/hooks/useDeviceType';

/**
 * EmojiAdd 컴포넌트
 *
 * 수신자(롤링페이퍼)에 새로운 이모지 반응을 추가하는 버튼 + 드롭다운 UI입니다.
 * 사용자가 플러스 아이콘을 클릭하면 EmojiPicker가 드롭다운 형태로 표시되고,
 * 선택한 이모지를 서버에 `createRecipientReaction` API를 통해 전송합니다.
 *
 * @param {object} props
 * @param {number|string} props.id
 *        - 이모지를 추가할 대상 Recipient ID
 * @param {(emoji: string) => void} [props.onSuccess]
 *        - 이모지 추가 API 호출이 성공했을 때 실행할 콜백 (예: 반응 목록을 다시 불러오기)
 */
export default function EmojiAdd({ id, onSuccess }) {
  const deviceType = useDeviceType();
  const { showToast } = useToast();
  const isMobile = deviceType === DEVICE_TYPES.PHONE;
  /**
   * useApi 훅을 통해 createRecipientReaction API 호출을 관리합니다.
   * - immediate: false 로 설정하여 컴포넌트 마운트 시 자동 호출을 방지
   * - refetch(params) 형태로 이모지를 선택할 때마다 호출하며, loading / error 상태를 관리
   */
  const { loading, error, refetch } = useApi(
    createRecipientReaction,
    { recipientId: id, emoji: '', type: 'increase' },
    {
      immediate: false,
      errorMessage: '이모지 추가에 실패했습니다',
    },
  );

  /**
   * 이모지를 클릭했을 때 실행되는 핸들러
   *
   * @param {{ emoji: string }} emojiData
   *        - EmojiPicker에서 전달된 이모지 정보 객체 (emojiData.emoji에 실제 문자)
   */
  const handleEmojiClick = (emojiData) => {
    // API 호출 파라미터를 업데이트하여 refetch() 실행
    refetch({ recipientId: id, emoji: emojiData.emoji, type: 'increase' })
      .then(() => {
        // 성공 시 드롭다운 닫고, 상위 콜백(onSuccess) 호출

        showToast({
          type: 'success',
          message: emojiData.emoji + ' 이모지 추가 성공!',
          timer: 1000,
        });
        onSuccess && onSuccess(emojiData.emoji);
      })
      .catch(() => {
        // error는 useApi 내부에서 errorMessage로 Toast 처리됨
      });
  };

  /**
   * @todo IconButton 컴포넌트로 변경 예정
   */
  const toggleButton = isMobile ? (
    <Button icon={AddImojiIcon} enabled={!loading} variant='outlined' size='36' iconOnly={true} />
  ) : (
    <Button
      icon={AddImojiIcon}
      enabled={!loading}
      variant='outlined'
      size='36'
      className={Style['emoji-add__icon-btn']}
      aria-label='이모지 추가'
    >
      추가
    </Button>
  );

  /**
   * 드롭다운 내부에 렌더링할 EmojiPicker 영역
   */
  const emojiList = (
    <div className={Style['emoji-add__menu-container']}>
      <EmojiPicker
        onEmojiClick={handleEmojiClick}
        lazyLoadEmojis={true}
        emojiStyle='apple'
        theme='light'
      />
    </div>
  );

  return (
    <div className={Style['emoji-add']}>
      {/* DropdownButton으로 간단히 토글 + 메뉴를 관리 */}
      <DropdownButton
        ToggleComponent={toggleButton}
        ListComponent={emojiList}
        layout='column'
        ButtonClassName={Style['emoji-add__toggle']}
        MenuClassName={Style['emoji-add__menu']}
      />

      {/* API 에러가 있다면 화면에 간단히 보여줌 */}
      {error && (
        <div className={Style['emoji-add__error']}>이모지 추가 중 오류 발생: {error.message}</div>
      )}
    </div>
  );
}
