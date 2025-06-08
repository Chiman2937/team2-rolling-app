import styles from './DeletePaperSuccessModal.module.scss';
import Modal from '@/components/Modal';
import successIcon from '@/assets/icons/icon_success_gray_lg.svg';
import { useCountdownTimer } from '../../../hooks/useCountdownTimer';
import { useEffect } from 'react';
import LinearTimerBar from '../../../components/LinearTimerBar';

const COUNT_DOWN_TIMER = 3;

const DeletePaperSuccessModal = ({ onClose }) => {
  const { remainingTime, isDone } = useCountdownTimer(COUNT_DOWN_TIMER);

  useEffect(() => {
    if (!isDone) return;
    onClose();
  }, [isDone]);

  return (
    <Modal className={styles['modal-styler']}>
      <Modal.headerArea className={styles['header-area']}>
        <img className={styles['header-icon']} src={successIcon} />
        <span className={styles['title']}>
          {' '}
          <strong style={{ color: 'var(--color-purple-600)' }}>{' 삭제'}</strong> 완료
        </span>
      </Modal.headerArea>
      <Modal.contentArea>
        <span className={styles['content']}>
          롤링페이퍼가 삭제 되었습니다. <br />
          <strong style={{ color: 'var(--color-purple-500)', fontWeight: '400' }}>
            {remainingTime}
          </strong>
          초후 목록페이지로 이동합니다.
        </span>
        <LinearTimerBar className={styles['progress-bar']} initialSeconds={COUNT_DOWN_TIMER} />
      </Modal.contentArea>
      <Modal.buttonArea className={styles['button-area']}>
        <button className={styles['button__submit']} onClick={onClose}>
          확인
        </button>
      </Modal.buttonArea>
    </Modal>
  );
};

export default DeletePaperSuccessModal;
