import { createContext, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './ModalProvider.module.scss';
import CardModal from '../components/CardModal';

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const closeTimeoutRef = useRef(null);

  const showModal = (modalItems) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
      setIsClosing(false);
      setIsOpen(false);
    }
    setModal(modalItems);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsClosing(true);
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      closeTimeoutRef.current = null;
    }, 300);
  };

  return (
    <ModalContext.Provider value={{ showModal, closeModal }}>
      {children}
      {isOpen > 0 &&
        createPortal(
          <div className={`${styles['modal-background']} ${styles[isClosing ? 'isClosing' : '']}`}>
            <div className={`${styles['modal-wrapper']} ${styles[isClosing ? 'isClosing' : '']}`}>
              <CardModal modalItems={modal} onClose={closeModal} />
            </div>
          </div>,
          document.getElementById('modal-root'),
        )}
    </ModalContext.Provider>
  );
};
