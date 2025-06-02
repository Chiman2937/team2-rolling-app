// 다양한 컨텍스트를 제공하는 컴포넌트
// 이 컴포넌트에 필요한 프로바이더를 추가하세요..
import { ToastProvider } from './ToastProvider';

export default function AppProvider({ children }) {
  return <ToastProvider>{children}</ToastProvider>;
}
