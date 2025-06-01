import styles from './CardModal.module.scss';
import Modal from './Modal';
import SenderProfile from './SenderProfile';

const CardModal = ({ modalItems, onClose }) => {
  const { sender, imageUrl, createdAt, content } = modalItems;

  return (
    <Modal>
      <Modal.headerArea>
        <SenderProfile sender={sender} imageUrl={imageUrl} createdAt={createdAt} />
      </Modal.headerArea>
      <Modal.divider />
      <Modal.contentArea>
        <span className={styles['content']}>{content}</span>
      </Modal.contentArea>
      <Modal.buttonArea>
        <button onClick={onClose}>확인</button>
      </Modal.buttonArea>
    </Modal>
  );
};

export default CardModal;
