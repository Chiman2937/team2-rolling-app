import { createContext, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './ModalProvider.module.scss';
import { useLocation } from 'react-router-dom';

// eslint-disable-next-line react-refresh/only-export-components
export const ModalContext = createContext();

const MODAL_CLOSE_DELAY = 500;

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const location = useLocation();

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

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    setIsOpen(false);
  }, [location]);

  return (
    <ModalContext.Provider value={{ showModal, closeModal }}>
      {children}
      {isOpen > 0 &&
        createPortal(
          <div
            className={`${styles['modal-background']} ${styles[isClosing ? 'isClosing' : '']}`}
            onClick={closeModal}
          >
            <div
              className={`${styles['modal-wrapper']} ${styles[isClosing ? 'isClosing' : '']}`}
              onClick={(e) => e.stopPropagation()}
            >
              {modal}
            </div>
          </div>,
          document.getElementById('modal-root'),
        )}
    </ModalContext.Provider>
  );
};
