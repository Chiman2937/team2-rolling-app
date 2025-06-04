// src/components/ProfileGroup/ToggleAvatars.jsx
import React from 'react';
import Style from './ToggleAvatars.module.scss';

/**
 * ToggleAvatars 컴포넌트
 *
 * @param {object} props
 * @param {Array}  props.profiles    - 정렬된 프로필 메시지 배열
 * @param {number} props.totalCount  - data.count (전체 메시지 수)
 * @param {boolean} props.loading
 * @param {Error|null} props.error
 */
export default function ToggleAvatars({ profiles, totalCount, loading, error }) {
  // totalCount를 최대 999로 제한
  const displayCount = totalCount > 999 ? '999+' : totalCount;

  // 로딩 상태
  if (loading) {
    return (
      <div className={Style['toggle-avatars--spinner']}>
        <div className={Style['toggle-avatars__spinner-circle']} />
        <div className={Style['toggle-avatars__spinner-circle']} />
        <div className={Style['toggle-avatars__spinner-circle']} />
        <span className={Style['toggle-avatars__count']}>0명이 작성했어요!</span>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return <div className={Style['toggle-avatars--error']}>오류 발생</div>;
  }

  // 작성자 수가 0명일 때
  if (totalCount === 0) {
    return (
      <div className={Style['toggle-avatars--empty']}>
        <span className={Style['toggle-avatars__count']}>0명이 작성했어요!</span>
      </div>
    );
  }

  // 실제 프로필이 1명 이상일 때
  const visibleCount = Math.min(totalCount, 3);
  let extraCount = totalCount > 3 ? totalCount - 3 : 0;
  // extraCount를 최대 99로 제한
  if (extraCount > 99) extraCount = 99;
  const displayExtra = extraCount === 99 ? '99+' : extraCount;

  const visibleProfiles = profiles.slice(0, visibleCount);

  return (
    <div className={Style['toggle-avatars']}>
      {visibleProfiles.map((profile, idx) => {
        // 아바타가 겹치게
        const marginRight = idx === visibleCount - 1 ? 0 : -16;
        const zIndex = idx + 1;
        return (
          <img
            key={profile.id}
            src={profile.profileImageURL}
            alt={profile.sender}
            className={Style['toggle-avatars__avatar']}
            style={{
              marginRight: `${marginRight}px`,
              zIndex: zIndex,
            }}
          />
        );
      })}

      {extraCount > 0 && <div className={Style['toggle-avatars__extra']}>+{displayExtra}</div>}

      <span className={Style['toggle-avatars__count']}>
        <span className={Style['toggle-avatars__count-number']}>{displayCount}</span>명이
        작성했어요!
      </span>
    </div>
  );
}
