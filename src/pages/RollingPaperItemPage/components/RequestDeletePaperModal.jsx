import styles from './RequestDeletePaperModal.module.scss';
import Modal from '@/components/Modal';
import alertIcon from '@/assets/icons/icon_alert_gray_lg.svg';

const RequestDeletePaperModal = ({ onConfirm, onCancel, modalItems }) => {
  const { title, content } = modalItems;
  return (
    <Modal className={styles['modal-styler']}>
      <Modal.headerArea className={styles['header-area']}>
        <img className={styles['header-icon']} src={alertIcon} />
        <span className={styles['title']}>{title}</span>
      </Modal.headerArea>
      <Modal.contentArea>
        <span className={styles['content']}>{content}</span>
      </Modal.contentArea>
      <Modal.buttonArea className={styles['button-area']}>
        <button className={styles['button__cancel']} onClick={onCancel}>
          취소
        </button>
        <button className={styles['button__submit']} onClick={onConfirm}>
          확인
        </button>
      </Modal.buttonArea>
    </Modal>
  );
};

export default RequestDeletePaperModal;
