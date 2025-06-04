import DropdownButton from '@/Components/DropDownButton/DropdownButton';
import Style from './PostHeader.module.scss';
import ProfileGroup from '@/components/PostHeader/ProfileGroup/ProfileGroup';
import EmojiGroup from '@/components/PostHeader/EmojiGroup/EmojiGroup';
import EmojiAdd from '@/components/PostHeader/EmojiGroup/EmojiAdd';
function PostHeader({ id, name }) {
  const handleSuccess = () => {
    // 이모지 추가 성공 시 처리 로직
  };

  return (
    <div className={Style['post-header']}>
      <div className={Style['post-header__container']}>
        <h3 className={Style['post-header__title']}>To. {name}</h3>
        <div className={Style['post-header__menu-container']}>
          <ProfileGroup id={id} />
          <div className={Style['post-header__divider']} />
          <EmojiGroup id={id} />
          <EmojiAdd id={id} onSuccess={handleSuccess} />
        </div>
      </div>
    </div>
  );
}

export default PostHeader;
