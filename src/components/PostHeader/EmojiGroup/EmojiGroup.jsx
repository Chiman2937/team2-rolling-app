// src/components/EmojiGroup/EmojiGroup.jsx
import { useApi } from '@/hooks/useApi';
import { listRecipientReactions } from '@/apis/recipientReactionsApi';
import DropdownButton from '@/components/DropdownButton/DropdownButton';
import ToggleEmoji from './ToggleEmoji';
import EmojiList from './EmojiList';
import Style from './EmojiGroup.module.scss';
import { useEffect, useState } from 'react';
import Skeleton from '../../Skeleton/Skeleton';
import EmojiAdd from './EmojiAdd';

/**
 * EmojiGroup 컴포넌트
 *
 * @param {object} props
 * @param {number|string} props.id
 *       - 수신자(롤링페이퍼) ID
 */
export default function EmojiGroup({ id }) {
  const [success, setSuccess] = useState(false);
  const { data, loading, error, refetch } = useApi(
    listRecipientReactions,
    { recipientId: id, limit: 8, offset: 0 },
    { errorMessage: '이모지 반응을 불러오는 데 실패했습니다.' },
  );

  const topEmojis = data?.results || []; // 최대 8개 이모지 반응 리스트

  // 이모지 반응 목록을 새로고침하기 위한 useEffect
  useEffect(() => {
    if (!success) return; // 이모지 추가 성공 상태가 아닐 때는 refetch 하지 않음
    refetch();
    setSuccess(false); // refetch 후 success 상태 초기화
  }, [success, refetch]);

  const handleAddSuccess = () => {
    setSuccess(true); // 이모지 추가 성공 시 상태 업데이트
  };

  //  로딩 / 에러 / 빈 상태 처리
  if (loading && !data) {
    return <Skeleton className={Style['emoji-group--loading']} width='225px' height='40px' />;
  }
  if (error) {
    return <div className={Style['emoji-group--error']}> 이모지 불러오기 실패 ㅠㅠ</div>;
  }
  if (!topEmojis.length) {
    return <div className={Style['emoji-group--empty']}>반응을 추가해보세요!</div>;
  }

  //  드롭다운 버튼에 ToggleComponent, ListComponent 넘김
  return (
    <div className={Style['emoji-group']}>
      <DropdownButton
        // ToggleComponent: 상위 3개 이모지
        ToggleComponent={<ToggleEmoji emojis={topEmojis} />}
        // ListComponent: 상위 8개 이모지를 나열
        ListComponent={<EmojiList emojis={topEmojis} />}
        layout='row'
        ButtonClassName={Style['emoji-group__toggle']}
        MenuClassName={Style['emoji-group__menu']}
        trigger='always'
        offset={18}
      />
      <EmojiAdd id={id} onSuccess={handleAddSuccess} />
    </div>
  );
}
