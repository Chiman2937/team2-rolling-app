import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import styles from './ColorPickerModal.module.scss';
import Modal from '../../../components/Modal';

const ColorPickerModal = ({ initialColor = '#ffffff', onSubmit, onClose }) => {
  const [color, setColor] = useState(initialColor);

  return (
    <Modal className={styles['modal-styler']}>
      <Modal.contentArea>
        <HexColorPicker color={color} onChange={setColor} />
        <div className={styles['color-info-box']}>
          <span style={{ color: `var(--color-gray-400)` }}>HEX</span>
          <div className={styles['color-info']}>
            <div className={styles['color']} style={{ backgroundColor: color }} />
            <div className={styles['color-context']}>{color}</div>
          </div>
        </div>
      </Modal.contentArea>
      <Modal.buttonArea className={styles['button-area']}>
        <button onClick={() => onSubmit(color)}>확인</button>
        <button onClick={onClose}>취소</button>
      </Modal.buttonArea>
    </Modal>
  );
};

export default ColorPickerModal;
