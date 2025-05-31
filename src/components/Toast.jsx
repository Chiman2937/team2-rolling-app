import styles from './Toast.module.scss';
import iconSuccess from '@/assets/icons/icon_success.svg';
import iconFail from '@/assets/icons/icon_fail.svg';
import iconClose from '@/assets/icons/icon_close.svg';
import { useEffect, useState } from 'react';

const IMG_SRC_TYPE = {
  success: iconSuccess,
  fail: iconFail,
};

const TOAST_CLOSING_STYLE = {
  false: '',
  true: 'isClosing',
};

const Toast = ({ type, message, onClose, timer }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleManualClick = () => {
    setIsClosing(true);
  };

  useEffect(() => {
    const autoCloseTimer = setTimeout(() => {
      setIsClosing(true);
    }, timer - 400);

    return () => clearTimeout(autoCloseTimer);
  }, [timer]);

  useEffect(() => {
    if (!isClosing) return;
    // 0.5초 후 onClose 호출 (애니메이션 끝나고)

    const closeTimeout = setTimeout(() => {
      onClose();
    }, 400); // 애니메이션 길이와 일치

    return () => clearTimeout(closeTimeout);
  }, [isClosing]);

  return (
    <div className={`${styles['container']} ${styles[TOAST_CLOSING_STYLE[isClosing]]}`}>
      <img src={IMG_SRC_TYPE[type]} width={24} alt='toast-icon' />
      <span className={styles['content']}>{message}</span>
      <img
        className={styles['button-close']}
        src={iconClose}
        width={24}
        alt='close-button'
        onClick={handleManualClick}
      />
    </div>
  );
};

export default Toast;
