import styles from './RequestDeletePaperModal.module.scss';
import Modal from '@/components/Modal';
import alertIcon from '@/assets/icons/icon_alert_gray_lg.svg';

const RequestDeletePaperModal = ({ onConfirm, onCancel }) => {
  return (
    <Modal className={styles['modal-styler']}>
      <Modal.headerArea className={styles['header-area']}>
        <img className={styles['header-icon']} src={alertIcon} />
        <span className={styles['title']}>
          정말 이 롤링페이퍼를
          <strong style={{ color: 'var(--color-purple-600)' }}>{' 삭제'}</strong>
          하시겠습니까?
        </span>
      </Modal.headerArea>
      <Modal.contentArea>
        <span className={styles['content']}>
          삭제하면 모든 코멘트가 함께 삭제되며
          <br />
          복구할 수 없습니다.
        </span>
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
