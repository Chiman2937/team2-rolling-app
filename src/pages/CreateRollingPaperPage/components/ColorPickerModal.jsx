import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import styles from './ColorPickerModal.module.scss';
import Modal from '../../../components/Modal';
import copyIcon from '@/assets/icons/icon_copy.svg';
import { useToast } from '@/hooks/useToast';

const ColorPickerModal = ({ initialColor = '#ffffff', onSubmit, onClose }) => {
  const [color, setColor] = useState(initialColor);
  const { showToast } = useToast();

  const handleColorInputChange = (e) => {
    setColor(e.target.value);
  };

  const handleColorCopyClick = async () => {
    const isHexColor = (str) => /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(str);

    if (!isHexColor(color)) {
      showToast({ type: 'fail', message: '유효한 값이 아닙니다', timer: 1000 });
      return;
    }

    try {
      await navigator.clipboard.writeText(color);
      showToast({ type: 'success', message: '복사 성공', timer: 1000 });
    } catch (err) {
      showToast({ type: 'fail', message: '복사 실패', timer: 1000 });
      console.error(err);
    }
  };

  return (
    <Modal className={styles['modal-styler']}>
      <Modal.contentArea>
        <HexColorPicker color={color} onChange={setColor} style={{ cursor: 'pointer' }} />
        <div className={styles['color-picker-modal__description-container']}>
          <span style={{ color: `var(--color-gray-400)` }}>HEX</span>
          <div className={styles['color-picker-modal__description']}>
            <div
              className={styles['color-picker-modal__color-display']}
              style={{ backgroundColor: color }}
            />
            <input
              className={styles['color-picker-modal__color-value-input']}
              value={color}
              onChange={handleColorInputChange}
            />
            <div className={styles['color-picker-modal__copy-button-area']}>
              <img
                src={copyIcon}
                className={styles['color-picker-modal__copy-button']}
                onClick={handleColorCopyClick}
              />
            </div>
          </div>
        </div>
      </Modal.contentArea>
      <Modal.buttonArea className={styles['button-area']}>
        <button
          className={styles['color-picker-modal__button-submit']}
          onClick={() => onSubmit(color)}
        >
          색상 선택
        </button>
        <button className={styles['color-picker-modal__button-cancel']} onClick={onClose}>
          취소
        </button>
      </Modal.buttonArea>
    </Modal>
  );
};

export default ColorPickerModal;
