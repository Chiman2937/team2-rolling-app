// src/components/PostHeader/PostHeader.jsx

import Style from './PostHeader.module.scss';

import ProfileGroup from '@/components/PostHeader/ProfileGroup/ProfileGroup';
import EmojiGroup from '@/components/PostHeader/EmojiGroup/EmojiGroup';
import EmojiAdd from '@/components/PostHeader/EmojiGroup/EmojiAdd';
import ShareMenu from '@/components/PostHeader/ShareMenu/ShareMenu';

import { useDeviceType } from '@/hooks/useDeviceType';
import { DEVICE_TYPES } from '@/constants/deviceType';
import { useKakaoShare } from '../../hooks/useKakaoShare';

/**
 * PostHeader 컴포넌트
 *
 * @param {{ id: number|string, name: string }} props
 */
export default function PostHeader({ id, name }) {
  // 현재 디바이스 타입을 가져옴
  const deviceType = useDeviceType();
  const isDesktop = deviceType === DEVICE_TYPES.DESKTOP;

  // 카카오 공유 이벤트 핸들러
  const { handleKakaoShare } = useKakaoShare();

  return (
    <header className={Style['post-header']}>
      <div className={Style['post-header__container']}>
        <h3 className={Style['post-header__title']}>To. {name}</h3>

        <section className={Style['post-header__menu-container']}>
          {/* 데스크톱에서만 ProfileGroup 표시 */}
          {isDesktop && (
            <>
              <ProfileGroup id={id} />
              <div className={Style['post-header__divider']} />
            </>
          )}
          <div className={Style['post-header__reaction-container']}>
            <div className={Style['post-header__emoji-container']}>
              <EmojiGroup id={id} />
            </div>

            <div className={Style['post-header__divider']} />

            <ShareMenu onKakaoClick={handleKakaoShare} />
          </div>
        </section>
      </div>
    </header>
  );
}
