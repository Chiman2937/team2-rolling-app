import { Link, useNavigate } from 'react-router-dom';
import LOGO from '@/assets/logo/Logo-Rolling.png';
import Style from './GlobalHeader.module.scss';
import useShowComponent from '@/hooks/useShowComponent';
import { DEVICE_TYPES } from '@/constants/deviceType';
import { useDeviceType } from '@/hooks/useDeviceType';
import Button from '../Button/Button';
import LogoButton from '../Button/LogoButton';
/**
 * GlobalHeader 컴포넌트
 * @description - 애플리케이션의 상단 헤더 컴포넌트로, 로고와 버튼을 포함합니다.
 * @returns {JSX.Element} - GlobalHeader 컴포넌트
 */
function GlobalHeader() {
  const deviceType = useDeviceType();
  const navigate = useNavigate();
  // 버튼을 보여줄 경로들
  const VISIBLE_PATHS = ['/', '/list'];
  const showButton = useShowComponent(VISIBLE_PATHS);
  const isMobile = deviceType === DEVICE_TYPES.PHONE;

  const handleButtonClick = () => {
    navigate('/post');
  };

  if (isMobile && !showButton) {
    // 모바일이면서 버튼을 보여주지 않는 경우 헤더를 숨김
    return null;
  }
  return (
    <header className={Style['header']}>
      <div className={Style['header__container']}>
        {/*  루트로 이동*/}
        <LogoButton />
        {/* todo: 디자인시스템 버튼으로 교체 */}
        {showButton && (
          <Button
            size='40'
            variant='outlined'
            onClick={handleButtonClick}
            aria-label='롤링 페이퍼 만들기'
            className={Style['header__button']}
          >
            롤링 페이퍼 만들기
          </Button>
        )}
      </div>
    </header>
  );
}

export default GlobalHeader;
