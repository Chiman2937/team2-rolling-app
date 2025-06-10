// src/components/EmojiGroup/EmojiGroup.jsx
import { useApi } from '@/hooks/useApi';
import { listRecipientReactions } from '@/apis/recipientReactionsApi';
import DropdownButton from '@/components/DropdownButton/DropdownButton';
import ToggleEmoji from './ToggleEmoji';
import EmojiList from './EmojiList';
import Style from './EmojiGroup.module.scss';
import { useEffect, useState } from 'react';

import EmojiAdd from './EmojiAdd';

/**
 * 🎉 EmojiGroup
 * -------------------------------------------
 * • 상위 8개의 이모지 반응을 보여주는 드롭다운
 * • 새 이모지 추가 시 낙관적 업데이트 + 백엔드 동기화
 *
 * @param {object} props
 * @param {number|string} props.id  롤링페이퍼(Recipient) ID
 */
export default function EmojiGroup({ id }) {
  /* --------------------------  State  -------------------------- */
  /** 서버에서 받아온 이모지들을 보관 + 낙관적 업데이트 적용용 */
  const [emojiList, setEmojiList] = useState([]);
  /** 드롭다운 열림 여부 – ToggleEmoji에 전달해 화살표 회전 등에 사용 */
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { data, refetch } = useApi(
    listRecipientReactions,
    { recipientId: id, limit: 8, offset: 0 },
    { errorMessage: '이모지 반응을 불러오는 데 실패했습니다.' },
  );

  /*  서버 데이터 => 로컬 상태 초기화 / 동기화 */
  useEffect(() => {
    if (data?.results) setEmojiList(data.results);
  }, [data]);

  /**
   * EmojiAdd 가 성공적으로 POST한 뒤 호출
   * 즉시 UI에 반영(낙관적 업데이트)하고, 백그라운드 refetch
   *
   * @param {string} addedEmoji  추가된 이모지 문자열
   */
  const handleAddSuccess = (newEmoji) => {
    setEmojiList((prev) => {
      const copy = [...prev]; // 기존 이모지 리스트 복사
      const targetIdx = copy.findIndex((e) => e.emoji === newEmoji);
      // 이미 존재하는 이모지라면 count만 증가
      if (targetIdx > -1) {
        copy[targetIdx] = { ...copy[targetIdx], count: copy[targetIdx].count + 1 };
      } else {
        // 새로운 이모지라면 새 객체 추가
        copy.push({ id: Date.now(), emoji: newEmoji, count: 1 });
      }
      return copy.sort((a, b) => b.count - a.count).slice(0, 8);
    });
    refetch(); // 백그라운드에서 실제 값 동기화
  };

  const handleDropdown = (isOpen) => {
    setIsDropdownOpen(isOpen);
  };

  //  로딩 / 에러 / 빈 상태 처리

  //  드롭다운 버튼에 ToggleComponent, ListComponent 넘김
  return (
    <div className={Style['emoji-group']}>
      {emojiList.length === 0 ? (
        <div className={Style['emoji-group--empty']}>반응을 추가해보세요!</div>
      ) : (
        <DropdownButton
          // ToggleComponent: 상위 3개 이모지
          ToggleComponent={<ToggleEmoji emojis={emojiList} open={isDropdownOpen} />}
          // ListComponent: 상위 8개 이모지를 나열
          ListComponent={<EmojiList emojis={emojiList} />}
          layout='row'
          ButtonClassName={Style['emoji-group__toggle']}
          MenuClassName={Style['emoji-group__menu']}
          trigger='always'
          offset={20}
          onToggle={handleDropdown}
        />
      )}

      <EmojiAdd id={id} onSuccess={handleAddSuccess} />
    </div>
  );
}
