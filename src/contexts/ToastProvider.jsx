import { createContext, useState } from 'react';
import { createPortal } from 'react-dom';
import Toast from '../components/Toast';
import styles from './ToastProvider.module.scss';

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = ({ type, message }) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, type, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {createPortal(
        <div className={styles['toast-wrapper']}>
          {toasts.map((t) => (
            <Toast key={t.id} message={t.message} type={t.type} />
          ))}
        </div>,
        document.getElementById('toast-root'),
      )}
    </ToastContext.Provider>
  );
};
