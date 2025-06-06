// src/hooks/useForm.jsx
import { useState, useCallback } from 'react';

/**
 * 폼의 상태를 관리하는 커스텀 훅
 *
 * @param {Object} initialFormValues
 *   - ex: { senderName: '', relationship: '친구', profileImageUrl: '', content: '', font: 'Noto Sans' }
 *
 * @returns {{
 *   values: Object,
 *   handleChange: (field: string) => (newValue: any) => void,
 *   resetForm: () => void
 * }}
 *
 * @example
 * const { values, handleChange, resetForm } = useForm({
 *   senderName: '',
 *   relationship: '친구',
 *   profileImageUrl: '',
 *   content: '',
 *   font: 'Noto Sans',
 *
 * });
 * handleChange('senderName')('김아무개');
 * // 즉시 상태를 업데이트합니다.
 */
export const useForm = (initialFormValues = {}) => {
  const [values, setValues] = useState(initialFormValues);

  // 특정 필드의 값을 즉시 업데이트하는 함수
  const handleChange = useCallback(
    (field) => (newValue) => {
      setValues((prev) => ({
        ...prev,
        [field]: newValue,
      }));
    },
    [],
  );

  // 폼을 초기값으로 되돌리는 함수
  const resetForm = useCallback(() => {
    setValues(initialFormValues);
  }, [initialFormValues]);

  return { values, handleChange, resetForm };
};
