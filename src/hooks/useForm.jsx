// src/hooks/useForm.jsx
import { useState, useCallback, useMemo } from 'react';

/**
 * 폼 상태와 검증을 관리하는 커스텀 훅
 *
 * @param {Object} initialValues
 *   - ex: { senderName: '', relationship: '친구', profileImageUrl: ''...}
 * @param {Object.<string, (value: any) => boolean>} [customValidationRules]
 *   - key: 필드명, value: 해당 필드의 추가 검증 함수
 *   - ex: { content: v => v.trim().length >= 10 }
 *
 * @returns {{
 *   values: Object,                 // 현재 폼 값
 *   handleChange: (field: string) => (newValue: any) => void,
 *   resetForm: () => void,
 *   isFormValid: boolean            // 모든 필드가 유효한지 여부
 * }}
 *
 */

export const useForm = (initialValues = {}, customValidationRules = {}) => {
  // 1) 폼 값 관리
  const [values, setValues] = useState(initialValues);

  // 2) 필드별 유효 여부 초기 계산
  const initValidity = useMemo(() => {
    return Object.keys(initialValues).reduce((acc, key) => {
      const value = initialValues[key];
      // 커스텀 검증 규칙이 있는 경우
      if (typeof customValidationRules[key] === 'function') {
        acc[key] = customValidationRules[key](value);
        // 기본 검증: 문자열은 빈 문자열이 아니고, 나머지는 null이 아닌지 확인
      } else {
        if (typeof value === 'string') {
          acc[key] = value.trim() !== '';
        } else {
          acc[key] = value != null;
        }
      }
      return acc;
    }, {});
  }, [initialValues, customValidationRules]);

  const [validity, setValidity] = useState(initValidity);

  // 3) 값 업데이트 및 즉시 검증
  const handleChange = useCallback(
    (field) => (newValue) => {
      setValues((prev) => ({
        ...prev,
        [field]: newValue,
      }));

      if (typeof customValidationRules[field] === 'function') {
        setValidity((prev) => ({
          ...prev,
          [field]: customValidationRules[field](newValue),
        }));
      } else {
        if (typeof newValue === 'string') {
          setValidity((prev) => ({
            ...prev,
            [field]: newValue.trim() !== '',
          }));
        } else {
          setValidity((prev) => ({
            ...prev,
            [field]: newValue != null,
          }));
        }
      }
    },
    [customValidationRules],
  );

  // 4) 초기화
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setValidity(initValidity);
  }, [initialValues, initValidity]);

  // 5) 최종 폼 유효성: validity 객체의 값이 전부 true여야 true
  const isFormValid = useMemo(() => {
    return Object.values(validity).every((v) => v === true);
  }, [validity]);

  return { values, handleChange, resetForm, isFormValid };
};
