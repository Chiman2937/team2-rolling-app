// src/hooks/useDropdownPosition.js
import { useState, useLayoutEffect } from 'react';

/**
 * useDropdownPosition 훅
 *
 * @param {React.RefObject<HTMLElement>} containerRef
 *        - 토글 버튼을 감싸고 있는 최상위 요소의 ref
 * @param {React.RefObject<HTMLElement>} menuRef
 *        - 실제 드롭다운 메뉴 요소의 ref
 * @param {boolean} isOpen
 *        - 드롭다운 열기/닫기 상태
 * @param {number} [margin=8]
 *        - 뷰포트 경계에 걸릴 때 유지할 최소 여유 픽셀 (기본 8px)
 * @returns {number} adjustX
 *        - “기본 중앙 정렬” 뒤에 추가로 좌우 이동할 픽셀 값 (양수면 오른쪽, 음수면 왼쪽)
 *
 * 이 훅은 드롭다운이 열린 순간(useLayoutEffect)마다
 *   1) 메뉴의 실제 width/height, 토글 요소의 위치를 계산
 *   2) 뷰포트 왼쪽/오른쪽 경계를 넘치는지 검사
 *   3) 넘친다면, 넘치지 않도록 보정할 X축 오프셋(adjustX)을 리턴
 *   4) 넘치지 않는다면 0을 리턴
 */
export function useDropdownPosition(containerRef, menuRef, isOpen, margin = 8) {
  const [adjustX, setAdjustX] = useState(0);

  useLayoutEffect(() => {
    if (!isOpen) {
      // 닫힌 상태가 되면 보정값을 0으로 초기화
      setAdjustX(0);
      return;
    }
    const containerEl = containerRef.current;
    const menuEl = menuRef.current;
    if (!containerEl || !menuEl) {
      setAdjustX(0);
      return;
    }

    // 메뉴 크기 / 위치
    const menuRect = menuEl.getBoundingClientRect();
    // 토글(혹은 wrapper) 크기 / 위치
    const containerRect = containerEl.getBoundingClientRect();
    const viewportWidth = window.innerWidth;

    // 1) 기본 중앙 정렬 시 메뉴가 놓일 “left” 픽셀 좌표
    //    (containerRect.left + containerRect.width/2) 위치가 토글 중앙의 x축 좌표
    //    여기서 메뉴 폭의 절반(menuRect.width/2)을 빼면, 최종 메뉴의 ‘왼쪽 모서리’ 픽셀 좌표(baseLeft)가 된다.
    const baseLeft = containerRect.left + containerRect.width / 2 - menuRect.width / 2;

    let shiftX = 0;

    // 2) 메뉴 우측이 뷰포트 우측을 넘어갈 때
    if (baseLeft + menuRect.width > viewportWidth) {
      // 넘어간 픽셀 수 = (baseLeft + menuRect.width) - viewportWidth
      // 보정 X = -(넘간 픽셀 수) - margin
      shiftX = viewportWidth - (baseLeft + menuRect.width) - margin;
    }

    // 3) 메뉴 좌측이 뷰포트 좌측을 넘어갈 때
    if (baseLeft < 0) {
      // 넘어간 픽셀 수 = 0 - baseLeft
      // 보정 X = + (넘간 픽셀 수) + margin
      shiftX = -baseLeft + margin;
    }

    setAdjustX(shiftX);
  }, [containerRef, menuRef, isOpen, margin]);

  return adjustX;
}
