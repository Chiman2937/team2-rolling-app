import { createContext, useState } from 'react';
import { createPortal } from 'react-dom';
import Toast from '../components/Toast';
import styles from './ToastProvider.module.scss';

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const closeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const showToast = ({ type, message }) => {
    const toastId = crypto.randomUUID();
    setToasts((prev) => [...prev, { id: toastId, type, message }]);

    setTimeout(() => {
      closeToast(toastId);
    }, 5000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toasts.length > 0 &&
        createPortal(
          <div className={styles['toast-wrapper']}>
            {toasts.map((t) => (
              <Toast
                key={t.id}
                message={t.message}
                type={t.type}
                onClose={() => closeToast(t.id)}
              />
            ))}
          </div>,
          document.getElementById('toast-root'),
        )}
    </ToastContext.Provider>
  );
};
