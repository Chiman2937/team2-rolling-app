import styles from './Toast.module.scss';
import iconSuccess from '@/assets/icons/icon_success.svg';
import iconFail from '@/assets/icons/icon_fail.svg';
import iconClose from '@/assets/icons/icon_close.svg';
import { useEffect, useState } from 'react';

const Toast = ({ icon, message }) => {
  const [visible, setVisible] = useState(true);

  const handleToastCloseClick = () => setVisible(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className={styles['container']}>
      <img src={icon} width={24} alt='toast-icon' />
      <span className={styles['context']}>{message}</span>
      <img src={iconClose} width={24} alt='toast-icon' onClick={handleToastCloseClick} />
    </div>
  );
};

const ToastSuccess = () => {
  return <Toast icon={iconSuccess} message='URL이 복사되었습니다' />;
};

const ToastFail = () => {
  return <Toast icon={iconFail} message='URL복사에 실패하였습니다' />;
};

Toast.success = ToastSuccess;
Toast.fail = ToastFail;

export default Toast;
