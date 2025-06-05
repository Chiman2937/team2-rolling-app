// src/components/PostHeader/PostHeader.jsx

import React, { useState } from 'react';
import Style from './PostHeader.module.scss';

import ProfileGroup from '@/components/PostHeader/ProfileGroup/ProfileGroup';
import EmojiGroup from '@/components/PostHeader/EmojiGroup/EmojiGroup';
import EmojiAdd from '@/components/PostHeader/EmojiGroup/EmojiAdd';
import ShareMenu from '@/components/PostHeader/ShareMenu/ShareMenu';

import { useDeviceType } from '@/hooks/useDeviceType';
import { DEVICE_TYPES } from '@/constants/deviceType';

/**
 * PostHeader 컴포넌트
 *
 * @param {{ id: number|string, name: string }} props
 */
export default function PostHeader({ id, name }) {
  // 이모지 추가 성공 시 EmojiGroup 새로고침을 위한 state
  const [refreshKey, setRefreshKey] = useState(0);
  const handleAddSuccess = () => setRefreshKey((prev) => prev + 1);

  // 현재 디바이스 타입을 가져옴
  const deviceType = useDeviceType();
  const isDesktop = deviceType === DEVICE_TYPES.DESKTOP;

  return (
    <header className={Style['post-header']}>
      <div className={Style['post-header__container']}>
        <h3 className={Style['post-header__title']}>To. {name}</h3>

        <nav className={Style['post-header__menu-container']}>
          {/* 데스크톱에서만 ProfileGroup 표시 */}
          {isDesktop && (
            <>
              <ProfileGroup id={id} />
              <div className={Style['post-header__divider']} />
            </>
          )}

          <div className={Style['post-header__emoji-container']}>
            <EmojiGroup id={id} refreshKey={refreshKey} />
            <EmojiAdd id={id} onSuccess={handleAddSuccess} />
          </div>

          <div className={Style['post-header__divider']} />

          <ShareMenu
            onKakaoClick={() => {
              /* 공유 로직 */
            }}
          />
        </nav>
      </div>
    </header>
  );
}
