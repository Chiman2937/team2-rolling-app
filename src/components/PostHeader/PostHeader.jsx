import DropdownButton from '@/Components/DropDownButton/DropdownButton';
import Style from './PostHeader.module.scss';
import ProfileGroup from '@/components/PostHeader/ProfileGroup/ProfileGroup';
import EmojiGroup from '@/components/PostHeader/EmojiGroup/EmojiGroup';
import EmojiAdd from '@/components/PostHeader/EmojiGroup/EmojiAdd';
import ShareMenu from '@/components/PostHeader/ShareMenu/ShareMenu';
import { useState } from 'react';

function PostHeader({ id, name }) {
  // 이모기 추가가 성공했을 때 반응 목록을 새로고침하기 위한 상태
  const [refreshKey, setRefreshKey] = useState(0);

  // EmojiAdd.onSuccess에서 호출될 함수
  const handleAddSuccess = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className={Style['post-header']}>
      <div className={Style['post-header__container']}>
        <h3 className={Style['post-header__title']}>To. {name}</h3>
        <div className={Style['post-header__menu-container']}>
          <ProfileGroup id={id} />
          <div className={Style['post-header__divider']} />
          <div className={Style['post-header__emoji-container']}>
            <EmojiGroup id={id} refreshKey={refreshKey} />
            <EmojiAdd id={id} onSuccess={handleAddSuccess} />
            <div className={Style['post-header__divider']} />
            <ShareMenu
              onKakaoClick={() => {
                /* 카카오톡 공유 로직 */
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostHeader;
