import { cloneElement, createContext, isValidElement, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './ModalProvider.module.scss';
import CardModal from '../components/CardModal';

// eslint-disable-next-line react-refresh/only-export-components
export const ModalContext = createContext();

const MODAL_CLOSE_DELAY = 500;

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const closeTimeoutRef = useRef(null);

  const resetTimer = () => {
    clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = null;
  };

  const pendingForClosingAnimation = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      closeTimeoutRef.current = null;
    }, MODAL_CLOSE_DELAY);
  };

  const showModal = (ModalComponent) => {
    resetTimer();
    setModal(ModalComponent);
    setIsOpen(true);
    setIsClosing(false);
  };

  const closeModal = () => {
    setIsClosing(true);
    pendingForClosingAnimation();
  };

  return (
    <ModalContext.Provider value={{ showModal, closeModal }}>
      {children}
      {isOpen > 0 &&
        createPortal(
          <div className={`${styles['modal-background']} ${styles[isClosing ? 'isClosing' : '']}`}>
            <div className={`${styles['modal-wrapper']} ${styles[isClosing ? 'isClosing' : '']}`}>
              {isValidElement(modal) ? cloneElement(modal, { onClose: closeModal }) : null}
            </div>
          </div>,
          document.getElementById('modal-root'),
        )}
    </ModalContext.Provider>
  );
};
