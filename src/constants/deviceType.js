// src/constants/deviceType.js

/**
 * 디바이스 타입을 구분하는 문자열 상수
 */
export const DEVICE_TYPES = {
  PHONE: 'phone', // ≤ 767px
  TABLET: 'tablet', // 768px ~ 1024px
  DESKTOP: 'desktop', // > 1024px
};

/**
 * 기본값: 'desktop'
 */
export const DEFAULT_DEVICE_TYPE = DEVICE_TYPES.DESKTOP;

export const BREAKPOINTS = {
  PHONE_MAX: 767,
  TABLET_MAX: 1199,
};

/**
 * 주어진 width(px)에 대응하는 디바이스 타입을 반환
 *
 * @param {number} width - window.innerWidth
 * @returns {'phone'|'tablet'|'desktop'}
 */
export function getDeviceTypeFromWidth(width) {
  if (width <= BREAKPOINTS.PHONE_MAX) {
    return DEVICE_TYPES.PHONE;
  }
  if (width <= BREAKPOINTS.TABLET_MAX) {
    return DEVICE_TYPES.TABLET;
  }
  return DEVICE_TYPES.DESKTOP;
}
