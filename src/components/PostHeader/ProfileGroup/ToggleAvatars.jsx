// src/components/ProfileGroup/ToggleAvatars.jsx
import React from 'react';
import Style from './ToggleAvatars.module.scss';
import GradientImage from '@/components/GradientImage/GradientImage';
import CountUp from '@/components/CountUp';
import { Link } from 'react-router-dom';
import LoadingLabel from '@/components/LoadingLabel/LoadingLabel';
/**
 * ToggleAvatars 컴포넌트
 *
 * @param {object} props
 * @param {string|number} props.id - 게시글 ID
 * @param {Array}  props.profiles    - 정렬된 프로필 메시지 배열
 * @param {number} props.totalCount  - data.count (전체 메시지 수)
 * @param {boolean} props.loading
 * @param {Error|null} props.error
 */
export default function ToggleAvatars({ id, profiles, totalCount, loading, error }) {
  // totalCount를 최대 999로 제한
  const displayCount = totalCount > 999 ? '999+' : totalCount;

  // 에러 상태
  if (error) {
    return <div className={Style['toggle-avatars--error']}>오류 발생</div>;
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
          <GradientImage
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
      {loading ? (
        <LoadingLabel
          loading={loading}
          className={Style['toggle-avatars--loading']}
          loadingText='작성자 둘러보는 중'
        />
      ) : totalCount === 0 ? (
        <Link to={`/post/${id}/message`} className={Style['toggle-avatars--empty']}>
          마음을 담은 메시지를 보내주세요!
        </Link>
      ) : (
        <span className={Style['toggle-avatars__count']}>
          <CountUp
            className={Style['toggle-avatars__count-number']}
            start={0}
            end={displayCount}
            duration={500}
          />
          명이 작성했어요!
        </span>
      )}
    </div>
  );
}
