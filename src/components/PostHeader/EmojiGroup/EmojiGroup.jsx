// src/components/EmojiGroup/EmojiGroup.jsx
import { useApi } from '@/hooks/useApi';
import { listRecipientReactions } from '@/apis/recipientReactionsApi';
import DropdownButton from '@/components/DropdownButton/DropdownButton';
import ToggleEmoji from './ToggleEmoji';
import EmojiList from './EmojiList';
import Style from './EmojiGroup.module.scss';
import { useEffect, useState, useRef } from 'react';
import LoadingLabel from '@/components/LoadingLabel/LoadingLabel';
import EmojiAdd from './EmojiAdd';
import { DEVICE_TYPES } from '@/constants/deviceType';
import { useDeviceType } from '@/hooks/useDeviceType';

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
  // 새로 추가된 이모지
  const [addedEmoji, setAddedEmoji] = useState(null);
  /** 드롭다운 열림 여부 – ToggleEmoji에 전달해 화살표 회전 등에 사용 */
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  /** 이모지 목록이 한 번이라도 불러와졌는지 여부 – 초기 로딩 시 UI 표시용 */
  const hasFetchedOnce = useRef(false);

  /* 디바이스 타입에 따라 최대 표시 개수 조정 */
  const deviceType = useDeviceType();
  const isMobile = deviceType === DEVICE_TYPES.PHONE;
  const isTablet = deviceType === DEVICE_TYPES.TABLET;
  const MAX_COUNT = isTablet || isMobile ? 6 : 8;

  /* --------------------------  API  -------------------------- */
  const { data, loading, refetch } = useApi(
    listRecipientReactions,
    { recipientId: id, limit: MAX_COUNT, offset: 0 },
    { errorMessage: '이모지 반응을 불러오는 데 실패했습니다.' },
  );

  //  --------------------------  Effect  -------------------------- */
  useEffect(() => {
    if (!loading) hasFetchedOnce.current = true;
  }, [loading]);
  /*  서버 데이터 => 로컬 상태 초기화 / 동기화 */
  useEffect(() => {
    if (data?.results) {
      setEmojiList(data.results);
    }
  }, [data]);

  /**
   * EmojiAdd 가 성공적으로 POST한 뒤 호출
   * 즉시 UI에 반영(낙관적 업데이트)하고, 백그라운드 refetch
   *
   * @param {string} addedEmoji  추가된 이모지 문자열
   */
  const handleAddSuccess = (newEmoji) => {
    //bump 트리거용: 새로 추가된 이모지 저장
    setAddedEmoji(newEmoji);
    // 낙관적 업데이트: 새 이모지 추가
    setEmojiList((prev) => {
      const copy = [...prev];
      // 이미 존재하는 이모지인지 확인
      const targetIdx = copy.findIndex((e) => e.emoji === newEmoji);
      // 이미 존재하는 이모지라면 count만 증가
      if (targetIdx > -1) {
        copy[targetIdx] = { ...copy[targetIdx], count: copy[targetIdx].count + 1 };
      } else {
        // 새로운 이모지라면 추가
        copy.push({ id: Date.now(), emoji: newEmoji, count: 1 });
      }
      // count 기준 내림차순 정렬 후 최대 MAX_COUNT 개수만 유지
      return copy.sort((a, b) => b.count - a.count).slice(0, MAX_COUNT);
    });

    refetch(); // 백그라운드에서 실제 값 동기화
  };

  // 드롭다운 열림/닫힘 상태 변경 핸들러
  const handleDropdown = (isOpen) => {
    setIsDropdownOpen(isOpen);
  };

  return (
    <div className={Style['emoji-group']}>
      {/* 처음 한번만 로딩 중 표시 */}
      {loading && !hasFetchedOnce.current ? (
        <LoadingLabel
          loading={loading}
          loadingText='최고의 반응을 모으는중'
          className={Style['emoji-group--loading']}
        />
      ) : emojiList.length === 0 ? (
        <div className={Style['emoji-group--empty']}>반응을 추가해보세요 😍</div>
      ) : (
        <DropdownButton
          // ToggleComponent: 상위 3개 이모지
          ToggleComponent={
            <ToggleEmoji emojis={emojiList} open={isDropdownOpen} addedEmoji={addedEmoji} />
          }
          // ListComponent: 상위 8개 이모지를 나열(태블릿은 6개)
          ListComponent={<EmojiList emojis={emojiList.slice(0, MAX_COUNT)} />}
          layout='row'
          ButtonClassName={Style['emoji-group__toggle']}
          MenuClassName={Style['emoji-group__menu']}
          trigger='always'
          offset={20}
          onToggle={handleDropdown}
        />
      )}

      <EmojiAdd id={id} onSuccess={handleAddSuccess} isMobile={isMobile} />
    </div>
  );
}
