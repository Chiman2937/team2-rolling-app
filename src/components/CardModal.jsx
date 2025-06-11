import styles from './CardModal.module.scss';
import Modal from '@/components/Modal';
import SenderProfile from '@/components/SenderProfile';
import Editor from '@/components/Editor/Editor';
import Button from './Button/Button';

const CardModal = ({ modalItems, onClose }) => {
  const { sender, relationship, imageUrl, createdAt, content, font } = modalItems;
  console.log('CardModal', modalItems);

  return (
    <Modal className={styles['modal-styler']}>
      <Modal.headerArea className={styles['header-area']}>
        <SenderProfile
          sender={sender}
          imageUrl={imageUrl}
          createdAt={createdAt}
          relationship={relationship}
        />
      </Modal.headerArea>
      <Modal.divider />
      <Modal.contentArea>
        <div className={styles['content']}>
          <Editor content={content} readOnly font={font} />
        </div>
      </Modal.contentArea>
      <Modal.buttonArea className={styles['button-area']}>
        <Button size={'medium'} variant={'primary'} onClick={onClose}>
          확인
        </Button>
      </Modal.buttonArea>
    </Modal>
  );
};

export default CardModal;
