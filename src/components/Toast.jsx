import styles from './Toast.module.scss';
import iconSuccess from '@/assets/icons/icon_success.svg';
import iconFail from '@/assets/icons/icon_fail.svg';
import iconClose from '@/assets/icons/icon_close.svg';

const IMG_SRC_TYPE = {
  success: iconSuccess,
  fail: iconFail,
};

const Toast = ({ type, message }) => {
  return (
    <div className={styles['container']}>
      <img src={IMG_SRC_TYPE[type]} width={24} alt='toast-icon' />
      <span className={styles['content']}>{message}</span>
      <img src={iconClose} width={24} alt='close-button' />
    </div>
  );
};

export default Toast;
