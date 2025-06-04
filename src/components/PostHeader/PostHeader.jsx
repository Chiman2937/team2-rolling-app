import DropdownButton from '@/Components/DropDownButton/DropdownButton';
import Style from './PostHeader.module.scss';
import ProfileGroup from '@/components/PostHeader/ProfileGroup/ProfileGroup';
import EmojiGroup from '@/components/PostHeader/EmojiGroup/EmojiGroup';
function PostHeader({ id, name }) {
  return (
    <div className={Style['post-header']}>
      <div className={Style['post-header__container']}>
        <h3 className={Style['post-header__title']}>To. {name}</h3>
        <div className={Style['post-header__menu-container']}>
          <ProfileGroup id={id} />
          <div className={Style['post-header__divider']} />
          <EmojiGroup id={id} />
        </div>
      </div>
    </div>
  );
}

export default PostHeader;
