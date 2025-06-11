import DropdownButton from '@/components/DropdownButton/DropdownButton';
import ShareIcon from '@/assets/icons/share-20.svg'; // SVG를 URL로 import 한 경우
import Style from './ShareMenu.module.scss';
import { useCallback } from 'react';
import { useToast } from '@/hooks/useToast';
import Button from '@/components/Button/Button';
/**
 *
 * 공유 아이콘(버튼)을 클릭했을 때 아래 두 가지 메뉴가 표시됩니다.
 * - 카카오톡 공유
 * - URL 공유
 *
 * @param {object} props
 * @param {() => void} props.onKakaoClick
 *        - “카카오톡 공유” 메뉴를 클릭했을 때 호출될 콜백
 * @param {() => void} props.onUrlClick
 *        - “URL 공유” 메뉴를 클릭했을 때 호출될 콜백
 */
export default function ShareMenu({ onKakaoClick }) {
  const { showToast } = useToast();
  const handleUrlCopy = useCallback(async () => {
    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl);

      // 복사 성공 시 토스트 또는 알림
      showToast({
        type: 'success',
        message: 'URL이 클립보드에 복사되었습니다.',
        timer: 1500,
      });
    } catch (err) {
      console.error('URL 복사 실패:', err);
      showToast({
        type: 'error',
        message: 'URL 복사에 실패했습니다.',
        timer: 1500,
      });
    }
  }, [showToast]);

  // 토글 버튼(Share 아이콘)
  const toggleButton = (
    <Button icon={ShareIcon} iconOnly variant='outlined' size='36' aria-label='공유하기' />
  );

  // 드롭다운 메뉴 리스트
  const listComponent = (
    <ul className={Style['share-menu__menu-list']}>
      <li
        className={Style['share-menu__menu-item']}
        onClick={() => {
          onKakaoClick && onKakaoClick();
        }}
      >
        카카오톡 공유
      </li>
      <li className={Style['share-menu__menu-item']} onClick={handleUrlCopy}>
        URL 공유
      </li>
    </ul>
  );

  return (
    <div className={Style['share-menu']}>
      <DropdownButton
        ToggleComponent={toggleButton}
        ListComponent={listComponent}
        layout='column'
        openOnHover={false}
      />
    </div>
  );
}
