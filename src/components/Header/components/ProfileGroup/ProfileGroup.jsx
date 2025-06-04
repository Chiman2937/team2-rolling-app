// src/components/ProfileGroup/ProfileGroup.jsx
import React, { useMemo } from 'react';
import DropdownButton from '@/components/DropdownButton/DropdownButton';
import { useApi } from '@/hooks/useApi';
import { listRecipientMessages } from '@/apis/recipientMessageApi';
import ToggleAvatars from './ToggleAvatars';
import ProfileList from './ProfileList';
import Style from './ProfileGroup.module.scss';

/**
 * ProfileGroup 컴포넌트
 */
export default function ProfileGroup({ id }) {
  const { data, loading, error, refetch } = useApi(
    listRecipientMessages,
    { recipientId: id, limit: 100, offset: 0 },
    { errorMessage: '프로필 이미지 리스트를 불러오는 데 실패했습니다.' },
  );

  const totalCount = data?.count || 0;

  const sortedProfiles = useMemo(() => {
    const messages = data?.results || [];
    return [...messages].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [data]);

  // 프로필 이미지 업데이트(..굳이인가?)
  const handleToggle = (open) => {
    if (open) {
      refetch();
    }
  };

  return (
    <div className={Style['profile-group']}>
      <DropdownButton
        ToggleComponent={
          <ToggleAvatars
            profiles={sortedProfiles}
            totalCount={totalCount}
            loading={loading}
            error={error}
          />
        }
        ListComponent={<ProfileList profiles={sortedProfiles} loading={loading} error={error} />}
        layout='column'
        ButtonClassName={Style['profile-group__toggle-button']}
        MenuClassName={Style['profile-group__menu-container']}
        onToggle={handleToggle}
      />
    </div>
  );
}
