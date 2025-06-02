import styles from './Modal.module.scss';

const Modal = ({ children }) => {
  return <div className={styles['container']}>{children}</div>;
};

const HeaderArea = ({ children }) => {
  return <div className={styles['header-area']}>{children}</div>;
};

const Divider = () => {
  return <div className={styles['divider']} />;
};

const ContentArea = ({ children }) => {
  return <div className={styles['content-area']}>{children}</div>;
};

const ButtonArea = ({ children }) => {
  return <div className={styles['button-area']}>{children}</div>;
};
Modal.headerArea = HeaderArea;
Modal.divider = Divider;
Modal.contentArea = ContentArea;
Modal.buttonArea = ButtonArea;

export default Modal;
