import styles from './ColorPickArea.module.scss';
import { useState } from 'react';
import { useModal } from '../../../hooks/useModal';
import ColorPickerModal from './ColorPickerModal';
import ColorSwatch from './ColorSwatch';
import AddItemButton from './AddItemButton';

const DEFAULT_COLOR_KEY = ['#FFE2AD', '#ECD9FF', '#B1E4FF', '#D0F5C3'];

const ColorPickArea = ({ formDataChange }) => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [customColorList, setCustomColorList] = useState([null, null, null]);
  const { showModal, closeModal } = useModal();

  const handleColorSelect = (hexColor) => {
    setSelectedColor(hexColor);
    formDataChange('backgroundImageURL', hexColor);
  };

  const handleAddButtonClick = () => {
    showModal(
      <ColorPickerModal
        initialColor={customColorList?.[0] || '#ffffff'}
        onSubmit={handleSelectColorFromModal}
        onClose={closeModal}
      />,
    );
  };

  const handleSelectColorFromModal = (hexColor) => {
    setCustomColorList((prev) => {
      if (prev.includes(hexColor)) return prev;
      return [hexColor, ...prev.slice(0, 2)];
    });
    closeModal();
  };

  return (
    <div className={styles['color-pick-area__container']}>
      {/* 기본 색상 선택 팔레트 */}
      <label className={styles['color-pick-area__label']}>기본 색상</label>
      <div className={styles['color-pick-area__palette']}>
        {DEFAULT_COLOR_KEY.map((hexColor) => {
          if (!hexColor) return;
          return (
            <ColorSwatch
              key={hexColor}
              hexColor={hexColor}
              selectedColor={selectedColor}
              onColorSelect={handleColorSelect}
            />
          );
        })}
      </div>
      {/* 커스텀 색상 선택 팔레트 */}
      <label className={styles['color-pick-area__label']}>더 많은 색상</label>
      <div className={styles['color-pick-area__palette']}>
        <AddItemButton onClick={handleAddButtonClick} />
        {customColorList.map((hexColor) => {
          if (!hexColor) return;
          return (
            <ColorSwatch
              key={hexColor}
              hexColor={hexColor}
              selectedColor={selectedColor}
              onColorSelect={handleColorSelect}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ColorPickArea;
