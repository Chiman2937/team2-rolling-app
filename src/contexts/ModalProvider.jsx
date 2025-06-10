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

  const modalWrapperRef = useRef(null);
  const isMouseDownInsideModal = useRef(false);

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

  const closeModalImmediately = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleMouseDown = (e) => {
      if (modalWrapperRef.current?.contains(e.target)) {
        isMouseDownInsideModal.current = true;
      } else {
        isMouseDownInsideModal.current = false;
      }
    };

    const handleMouseUp = (e) => {
      if (
        !modalWrapperRef.current?.contains(e.target) &&
        isMouseDownInsideModal.current === false
      ) {
        closeModal();
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isOpen]);

  //Modal이 열렸을 때 esc를 누르면 Modal Close
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

  //페이지 주소가 이동되면 Modal 강제 종료
  useEffect(() => {
    if (!isOpen) return;
    closeModalImmediately();
  }, [location]);

  return (
    <ModalContext.Provider value={{ showModal, closeModal }}>
      {children}
      {isOpen > 0 &&
        createPortal(
          <div className={`${styles['modal-background']} ${styles[isClosing ? 'isClosing' : '']}`}>
            <div
              className={`${styles['modal-wrapper']} ${styles[isClosing ? 'isClosing' : '']}`}
              onClick={(e) => e.stopPropagation()}
              ref={modalWrapperRef}
            >
              {modal}
            </div>
          </div>,
          document.getElementById('modal-root'),
        )}
    </ModalContext.Provider>
  );
};
