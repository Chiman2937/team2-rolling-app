import styles from './ImageSwatch.module.scss';
import iconSelectedDark from '@/assets/icons/icon_success_darkgray_lg.svg';
import DefaultImage from '@/assets/images/image_background_default.svg';

const ImageSwatch = ({ imageUrl, selectedImageUrl, onImageSelect }) => {
  return (
    <div className={styles['color-swatch__item-wrapper']} onClick={() => onImageSelect(imageUrl)}>
      <img className={styles['color-swatch__item']} src={imageUrl} />
      {selectedImageUrl === imageUrl && <div className={styles['color-swatch__overlay']} />}
      {selectedImageUrl === imageUrl && (
        <img src={iconSelectedDark} className={styles['color-swatch__item-selected']} />
      )}
    </div>
  );
};

const defaultImage = () => {
  return (
    <div className={styles['color-swatch__item-wrapper']}>
      <img className={styles['color-swatch__item']} src={DefaultImage} />
    </div>
  );
};

ImageSwatch.default = defaultImage;

export default ImageSwatch;
