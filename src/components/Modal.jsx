import styles from './Modal.module.scss';

const Modal = ({ children, className = '', ...props }) => {
  return (
    <div className={`${styles['container']} ${className}`} {...props}>
      {children}
    </div>
  );
};

const HeaderArea = ({ children, className = '' }) => {
  return <div className={className}>{children}</div>;
};

const Divider = () => {
  return <div className={styles['divider']} />;
};

const ContentArea = ({ children }) => {
  return <div className={styles['content-area']}>{children}</div>;
};

const ButtonArea = ({ children, className = '' }) => {
  return <div className={className}>{children}</div>;
};
Modal.headerArea = HeaderArea;
Modal.divider = Divider;
Modal.contentArea = ContentArea;
Modal.buttonArea = ButtonArea;

export default Modal;
