import { useNavigate } from 'react-router-dom';
import LOGO from '@/assets/logo/Logo-Rolling.png';
import Style from './GlobalHeader.module.scss';
import useShowComponent from '@/hooks/useShowComponent';
// GNB 컴포넌트
function GlobalHeader() {
  // TODO: 커스텀 훅으로 변경해야할수도 있음
  const navigate = useNavigate();
  const VISIBLE_PATHS = ['/', '/list']; // 버튼을 보여줄 경로들
  const showButton = useShowComponent(VISIBLE_PATHS);

  const handleButtonClick = () => {
    navigate('/post');
  };

  return (
    <header className={Style['header']}>
      <div className={Style['header__container']}>
        <img src={LOGO} alt='Logo' className={Style['header__logo']} />
        {/* TODO : 디자인시스템에 기반한 버튼 컴포넌트로 변경 */}
        {showButton && (
          <button
            type='button'
            onClick={handleButtonClick}
            aria-label='롤링 페이퍼 만들기'
            className={Style['header__button']}
          >
            롤링 페이퍼 만들기
          </button>
        )}
      </div>
    </header>
  );
}

export default GlobalHeader;
