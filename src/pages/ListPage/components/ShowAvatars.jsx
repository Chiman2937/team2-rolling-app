// src/components/ProfileGroup/ShowAvatars.jsx
import React from 'react';
import styles from './ShowAvatars.module.scss';

/**
 * showavatars 컴포넌트
 *
 * @param {object} props
 * @param {Array}  props.profiles    - 정렬된 프로필 메시지 배열
 * @param {number} props.totalCount  - data.count (전체 메시지 수)
 * @param {boolean} props.loading
 * @param {Error|null} props.error
 */
export default function ShowAvatars({ profiles, totalCount, loading, error }) {
  // 로딩 상태 표시: 세 개의 스피너 원
  if (loading) {
    return (
      <div className={styles['show-avatars--spinner']}>
        <div className={styles['show-avatars__spinner-circle']} />
        <div className={styles['show-avatars__spinner-circle']} />
        <div className={styles['show-avatars__spinner-circle']} />
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return <div className={styles['show-avatars--error']}>오류 발생</div>;
  }

  // 작성자 수가 0명일 때 빈 컨테이너
  if (totalCount === 0) {
    return <div className={styles['show-avatars--empty']} />;
  }

  // 최대 3명까지 실제 프로필
  const visibleCount = Math.min(totalCount, 3);
  const visibleProfiles = profiles.slice(0, visibleCount);
  let extraCount = totalCount > 3 ? totalCount - 3 : 0;
  if (extraCount > 99) extraCount = 99;
  const displayExtra = extraCount === 99 ? '99+' : extraCount;

  // 슬롯 오프셋
  const GAP = 16;

  return (
    <div
      className={styles['show-avatars']}
      style={{ position: 'relative', width: `${(3 - 1) * GAP + 28}px`, height: '28px' }}
    >
      {/* 실제 프로필 아바타 */}
      {visibleProfiles.map((profile, idx) => (
        <img
          key={profile.id}
          src={profile.profileImageURL}
          alt={profile.sender}
          className={styles['show-avatars__avatar']}
          style={{ position: 'absolute', left: `${idx * GAP}px` }}
        />
      ))}

      {/* +n 표시 */}
      {extraCount > 0 && (
        <div
          className={styles['show-avatars__extra']}
          style={{ position: 'absolute', left: `${4 * GAP}px` }}
        >
          +{displayExtra}
        </div>
      )}
    </div>
  );
}
