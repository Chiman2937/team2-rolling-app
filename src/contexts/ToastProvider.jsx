import { createContext, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Toast from '../components/Toast';
import styles from './ToastProvider.module.scss';

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const timeoutMap = useRef({});

  const closeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    clearTimeout(timeoutMap.current[id]);
    delete timeoutMap.current[id];
  };

  const showToast = ({ type, message, timer }) => {
    const toastId = crypto.randomUUID();
    setToasts((prev) => [...prev, { id: toastId, type, message, timer }]);

    const timeoutId = setTimeout(() => {
      closeToast(toastId);
    }, timer);

    timeoutMap.current[toastId] = timeoutId;
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
                timer={t.timer}
                onClose={() => closeToast(t.id)}
              />
            ))}
          </div>,
          document.getElementById('toast-root'),
        )}
    </ToastContext.Provider>
  );
};
