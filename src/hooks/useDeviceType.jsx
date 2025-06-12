// src/hooks/useDeviceType.js

import { useState, useEffect, useCallback } from 'react';
import { DEFAULT_DEVICE_TYPE, getDeviceTypeFromWidth } from '@/constants/deviceType';

/**
 * useDeviceType 훅
 *
 *
 * @returns {'phone'|'tablet'|'desktop'}
 */
export function useDeviceType() {
  //  초기값: SSR 시 DEFAULT_DEVICE_TYPE
  const [deviceType, setDeviceType] = useState(DEFAULT_DEVICE_TYPE);

  //  실제 창 너비를 보고 deviceType을 재계산하는 함수
  const updateDeviceType = useCallback(() => {
    if (typeof window === 'undefined') return;
    const newType = getDeviceTypeFromWidth(window.innerWidth);
    setDeviceType(newType);
  }, []);

  useEffect(() => {
    // 클라이언트 마운트 직후 한 번 호출
    updateDeviceType();

    // resize 이벤트에 따라 갱신
    window.addEventListener('resize', updateDeviceType);
    return () => {
      window.removeEventListener('resize', updateDeviceType);
    };
  }, [updateDeviceType]);

  return deviceType;
}
