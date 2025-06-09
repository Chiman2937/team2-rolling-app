import styles from './CardModal.module.scss';
import Modal from '@/components/Modal';
import SenderProfile from '@/components/SenderProfile';
import Editor from '@/components/Editor/Editor';

const CardModal = ({ modalItems, onClose }) => {
  const { sender, imageUrl, createdAt, content, font } = modalItems;
  console.log('CardModal', modalItems);

  return (
    <Modal className={styles['modal-styler']}>
      <Modal.headerArea className={styles['header-area']}>
        <SenderProfile sender={sender} imageUrl={imageUrl} createdAt={createdAt} />
      </Modal.headerArea>
      <Modal.divider />
      <Modal.contentArea>
        <div className={styles['content']}>
          {console.log('fontsss', font)}
          <Editor content={content} readOnly font={font} />
        </div>
      </Modal.contentArea>
      <Modal.buttonArea className={styles['button-area']}>
        <button onClick={onClose}>확인</button>
      </Modal.buttonArea>
    </Modal>
  );
};

export default CardModal;
