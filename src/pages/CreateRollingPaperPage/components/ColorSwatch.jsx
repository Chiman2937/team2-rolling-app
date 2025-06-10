import styles from './ColorSwatch.module.scss';
import iconSelectedDark from '@/assets/icons/icon_success_darkgray_lg.svg';
import iconSelectedLight from '@/assets/icons/icon_success_gray_lg.svg';
import { getIsColorDark } from '../../../utils/getIsColorDark';

const ColorSwatch = ({ hexColor, selectedColor, onColorSelect }) => {
  return (
    <div className={styles['color-swatch__item-wrapper']} onClick={() => onColorSelect(hexColor)}>
      <div className={styles['color-swatch__item']} style={{ backgroundColor: hexColor }} />
      {selectedColor === hexColor &&
        (getIsColorDark(hexColor) ? (
          <img src={iconSelectedLight} className={styles['color-swatch__item-selected']} />
        ) : (
          <img src={iconSelectedDark} className={styles['color-swatch__item-selected']} />
        ))}
    </div>
  );
};

export default ColorSwatch;
