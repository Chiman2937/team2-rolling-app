import styles from './AddItemButton.module.scss';
import iconAdd from '@/assets/icons/icon_add_enabled.svg';

const AddItemButton = ({ onClick }) => {
  return (
    <div className={styles['add-item__wrapper']}>
      <div className={styles['add-item__button']} onClick={onClick}></div>
      <img className={styles['add-item__image']} src={iconAdd} />
    </div>
  );
};

export default AddItemButton;
