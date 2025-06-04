import DropdownButton from '@/Components/DropDownButton/DropdownButton';
import Style from './PostHeader.module.scss';

function PostHeader({ id, name }) {
  const menuItems = ['수정', '삭제', '공유'];
  const myMenuList = (
    <ul className={Style['header__menu-list']}>
      {menuItems.map((label, idx) => (
        <li key={idx} className={Style['header__menu-item']}>
          <button className={Style['header__menu-button']}>{label}</button>
        </li>
      ))}
    </ul>
  );
  const myToggle = <span className={Style['header__option-btn']}>{id}</span>;

  return (
    <div className={Style['post-header']}>
      <div className={Style['post-header__container']}>
        <h3 className={Style['post-header__title']}>TO. {name}</h3>
        <div className={Style['post-header__menu-container']}>
          <DropdownButton
            ToggleComponent={myToggle}
            ListComponent={myMenuList}
            layout='column'
            ButtonClassName={Style['post-header__option-btn']}
            MenuClassName={Style['post-header__menu-container']}
            onToggle={(isOpen) => console.log(`Dropdown is now ${isOpen ? 'open' : 'closed'}`)}
          />
        </div>
      </div>
    </div>
  );
}

export default PostHeader;
