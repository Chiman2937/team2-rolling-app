// src/components/ProfileGroup/ProfileList.jsx
import React from 'react';
import Style from './ProfileList.module.scss';

/**
 * ProfileList 컴포넌트
 */
export default function ProfileList({ profiles, loading, error }) {
  if (loading) {
    return <div className={Style['profile-list--spinner']}>isLoading</div>;
  }
  if (error) {
    return <div className={Style['profile-list--error']}>에러 발생: {error.message}</div>;
  }

  const top10 = profiles.slice(0, 10);
  if (top10.length === 0) {
    return <div className={Style['profile-list--empty']}>등록된 프로필이 없습니다.</div>;
  }

  return (
    <ul className={Style['profile-list__container']}>
      {top10.map((profile) => {
        // 이름이 10자를 넘으면 잘라서 "..." 붙이기
        const displayName =
          profile.sender.length > 10 ? profile.sender.slice(0, 10) + '...' : profile.sender;

        return (
          <li key={profile.id} className={Style['profile-list__item']}>
            <img
              src={profile.profileImageURL}
              alt={profile.sender}
              className={Style['profile-list__avatar']}
            />
            <span className={Style['profile-list__name']}>{displayName}</span>
          </li>
        );
      })}
    </ul>
  );
}
