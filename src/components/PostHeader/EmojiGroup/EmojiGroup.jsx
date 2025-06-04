// src/components/EmojiGroup/EmojiGroup.jsx
import { useApi } from '@/hooks/useApi';
import { listRecipientReactions } from '@/apis/recipientReactionsApi';
import DropdownButton from '@/components/DropdownButton/DropdownButton';
import ToggleEmoji from './ToggleEmoji';
import EmojiList from './EmojiList';
import Style from './EmojiGroup.module.scss';

/**
 * EmojiGroup 컴포넌트
 *
 * @param {object} props
 * @param {number|string} props.id
 *       - 수신자(롤링페이퍼) ID
 */
export default function EmojiGroup({ id }) {
  const { data, loading, error } = useApi(
    listRecipientReactions,
    { recipientId: id, limit: 8, offset: 0 },
    { errorMessage: '이모지 반응을 불러오는 데 실패했습니다.' },
  );

  const topEmojis = data?.results || []; // 최대 8개 이모지 반응 리스트

  // 3) 로딩 / 에러 / 빈 상태 처리
  if (loading) {
    return <div className={Style['emoji-group--loading']}>이모지 로딩 중...</div>;
  }
  if (error) {
    return <div className={Style['emoji-group--error']}> 이모지 불러오기 실패 ㅠㅠ</div>;
  }
  if (!topEmojis.length) {
    return <div className={Style['emoji-group--empty']}>반응을 추가해보세요!</div>;
  }

  // 4) 드롭다운 버튼에 ToggleComponent, ListComponent 넘김
  return (
    <div className={Style['emoji-group']}>
      <DropdownButton
        // ToggleComponent: 상위 3개 이모지
        ToggleComponent={<ToggleEmoji emojis={topEmojis} />}
        // ListComponent: 상위 8개 이모지를 그리드로 나열
        ListComponent={<EmojiList emojis={topEmojis} />}
        layout='row'
        ButtonClassName={Style['emoji-group__toggle']}
        MenuClassName={Style['emoji-group__menu']}
        openOnHover={true}
      />
    </div>
  );
}
