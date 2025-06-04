import { useNavigate } from 'react-router-dom';
import LOGO from '@/assets/logo/Logo-Rolling.png';
import Style from './GlobalHeader.module.scss';
import useShowComponent from '@/hooks/useShowComponent';
import Button from '@/components/Button/Button';
/**
 * GlobalHeader 컴포넌트
 * @description - 애플리케이션의 상단 헤더 컴포넌트로, 로고와 버튼을 포함합니다.
 * @returns {JSX.Element} - GlobalHeader 컴포넌트
 */
function GlobalHeader() {
  const navigate = useNavigate();
  // 버튼을 보여줄 경로들
  const VISIBLE_PATHS = ['/', '/list'];
  const showButton = useShowComponent(VISIBLE_PATHS);

  const handleButtonClick = () => {
    navigate('/post');
  };

  return (
    <header className={Style['header']}>
      <div className={Style['header__container']}>
        <img src={LOGO} alt='Logo' className={Style['header__logo']} />

        {showButton && (
          <button
            size='36'
            variant='outlined'
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
