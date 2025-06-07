import styles from './CardModal.module.scss';
import Modal from '@/components/Modal';
import SenderProfile from '@/components/SenderProfile';

const CardModal = ({ modalItems, onClose }) => {
  const { sender, imageUrl, createdAt, content } = modalItems;

  return (
    <Modal className={styles['modal-styler']}>
      <Modal.headerArea className={styles['header-area']}>
        <SenderProfile sender={sender} imageUrl={imageUrl} createdAt={createdAt} />
      </Modal.headerArea>
      <Modal.divider />
      <Modal.contentArea>
        <span className={styles['content']}>{content}</span>
      </Modal.contentArea>
      <Modal.buttonArea className={styles['button-area']}>
        <button onClick={onClose}>확인</button>
      </Modal.buttonArea>
    </Modal>
  );
};

export default CardModal;
