import { useContext } from 'react';
import { ModalContext } from '../contexts/ModalProvider';

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModal은 ModalProvider 안에서 사용되어야 합니다');
  return context;
};
