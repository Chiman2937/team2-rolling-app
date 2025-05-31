import { createPortal } from 'react-dom';
import styles from './CardModal.module.scss';

const CardModal = ({ children }) => {
  return createPortal(
    <div className={styles['modal-wrapper']}>{children}</div>,
    document.getElementById('modal-root'),
  );
};

const HeaderArea = ({ children }) => {
  return <div className={styles['header']}>{children}</div>;
};

const Divider = () => {
  return <div className={styles['divider']} />;
};

const ContentArea = ({ children }) => {
  return <span className={styles['content-area']}>{children}</span>;
};

const ButtonArea = ({ children }) => {
  return <div className={styles['button-area']}>{children}</div>;
};
CardModal.headerArea = HeaderArea;
CardModal.divider = Divider;
CardModal.contentArea = ContentArea;
CardModal.buttonArea = ButtonArea;

export default CardModal;
