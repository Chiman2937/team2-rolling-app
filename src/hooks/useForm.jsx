// src/hooks/useForm.jsx
import { useState, useCallback, useMemo } from 'react';

/**
 * 폼 상태와 검증을 관리하는 커스텀 훅
 *
 * @param {Object} initialValues
 * @param {Object.<string,(value:any)=>boolean>} [customValidationRules]
 *
 * @returns {{
 *   values:        Object,
 *   validity:      Object,                     //  필드별 유효성
 *   touched:       Object,                     //  필드별 입력 여부
 *   handleChange:  (field:string)=>(v:any)=>void,
 *   handleBlur:    (field:string)=>() => void, //  blur 전용
 *   resetForm:     () => void,
 *   isFormValid:   boolean
 * }}
 */

export const useForm = (initialValues = {}, customValidationRules = {}) => {
  /* 1) 값 관리 */
  const [values, setValues] = useState(initialValues);

  /* 2) 초기 유효성 계산 */
  const initValidity = useMemo(() => {
    const validate = (k, v) =>
      typeof customValidationRules[k] === 'function'
        ? customValidationRules[k](v)
        : typeof v === 'string'
          ? v.trim() !== ''
          : v != null;

    return Object.fromEntries(Object.entries(initialValues).map(([k, v]) => [k, validate(k, v)]));
  }, [initialValues, customValidationRules]);
  const [validity, setValidity] = useState(initValidity);

  /* 3) touched 상태 */
  const [touched, setTouched] = useState(
    Object.fromEntries(Object.keys(initialValues).map((k) => [k, false])),
  );

  /* 4) 값 & 유효성 & touched 업데이트 */
  const handleChange = useCallback(
    (field) => (newValue) => {
      setValues((p) => ({ ...p, [field]: newValue }));
      setTouched((p) => ({ ...p, [field]: true }));

      const isValid =
        typeof customValidationRules[field] === 'function'
          ? customValidationRules[field](newValue)
          : typeof newValue === 'string'
            ? newValue.trim() !== ''
            : newValue != null;

      setValidity((p) => ({ ...p, [field]: isValid }));
    },
    [customValidationRules],
  );

  /* blur 만으로 touched 표시하고 싶을 때 */
  const handleBlur = useCallback((field) => () => setTouched((p) => ({ ...p, [field]: true })), []);

  /* 5) 초기화 */
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setValidity(initValidity);
    setTouched(Object.fromEntries(Object.keys(initialValues).map((k) => [k, false])));
  }, [initialValues, initValidity]);

  /* 6) 폼 전체 유효성 */
  const isFormValid = useMemo(() => Object.values(validity).every(Boolean), [validity]);

  return {
    values,
    validity, // ➕
    touched, // ➕
    handleChange,
    handleBlur, // ➕
    resetForm,
    isFormValid,
  };
};
