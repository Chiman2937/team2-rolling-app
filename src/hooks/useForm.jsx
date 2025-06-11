// src/hooks/useForm.jsx
import { useState } from 'react';

/**
 * 범용 폼 훅 – 모든 검증 규칙은 호출 측에서 주입
 *
 * @template V
 * @param {V} initialValues                             초기 필드 값
 * @param {Object.<keyof V, Array<{test:(value:any, all:V)=>boolean, message:string}>>} validationRules
 *        필드별 검증 규칙(배열). 규칙이 없으면 해당 필드는 항상 통과
 *
 * @returns {{
 *   values: V,
 *   errorMessages: Record<keyof V, string|null>,
 *   fieldValidity: Record<keyof V, boolean|null>,    // null=미검증, true=통과, false=실패
 *   handleChange: (field:keyof V)=>(value:any)=>void,
 *   handleBlur:   (field:keyof V)=>() => void,
 *   resetForm: () => void,
 *   isFormValid: boolean
 * }}
 */

export const useForm = (initialValues = {}, validationRules = {}) => {
  const fieldNames = Object.keys(initialValues);

  // 다른 필드 값(allValue)들을 포함한 유효성 검사 -> 첫 번째 실패 메시지 또는 null
  // 다른 필드의 값이 필요할 때는 allValues를 통해 접근
  const validateField = (fieldName, value, allValues) => {
    const rulesForField = validationRules[fieldName] ?? [];
    const failedRule = rulesForField.find((rule) => !rule.test(value, allValues));
    return failedRule ? failedRule.message : null;
  };
  /* ------------------------------- 상태 관리 ------------------------------- */
  const [values, setValues] = useState(initialValues);

  // 초기값으로 각 필드의 유효성 검사 결과를 설정
  const [errorMessages, setErrorMessages] = useState(() => {
    const initialMessage = {};
    for (const field in initialValues) {
      initialMessage[field] = validateField(field, initialValues[field], initialValues);
    }
    return initialMessage;
  });

  // 한번이라도 입력된 필드인지 여부
  // 초기값으로 필드별 touched 상태를 false로 설정
  const [touchedFields, setTouchedFields] = useState(() =>
    Object.fromEntries(fieldNames.map((name) => [name, false])),
  );

  // 필드가 아직 건드리지 않았으면 null, 통과하면 true, 에러면 false
  const getFieldValidity = (fieldName) => {
    if (!touchedFields[fieldName]) {
      return null; // 아직 건드리지 않음
    }
    if (errorMessages[fieldName] === null) {
      return true; // 통과
    }
    return false; // 에러
  };

  // 각 필드의 유효성 검사 결과를 객체로 반환
  const fieldValidity = Object.fromEntries(
    fieldNames.map((name) => [name, getFieldValidity(name)]),
  );

  // 전체 폼이 유효한지 여부
  const isFormValid = fieldNames.every((name) => errorMessages[name] === null);

  /* -------------------------------------------- handlers */
  const handleChange = (fieldName) => (newValue) => {
    setValues((previous) => {
      const next = { ...previous, [fieldName]: newValue };
      setErrorMessages((previousErrors) => ({
        ...previousErrors,
        [fieldName]: validateField(fieldName, newValue, next),
      }));
      return next;
    });
  };

  const handleBlur = (fieldName) => () =>
    setTouchedFields((prev) => ({ ...prev, [fieldName]: true }));

  const resetForm = () => {
    setValues(initialValues);
    setTouchedFields(Object.fromEntries(fieldNames.map((name) => [name, false])));
    setErrorMessages(() =>
      Object.fromEntries(
        fieldNames.map((name) => [name, validateField(name, initialValues[name], initialValues)]),
      ),
    );
  };

  /* ------------------------------------------------ return */
  return {
    values,
    errorMessages,
    fieldValidity,
    handleChange,
    handleBlur,
    resetForm,
    isFormValid,
  };
};
