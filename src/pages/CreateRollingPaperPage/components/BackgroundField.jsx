import { useState } from 'react';
import OptionToggle from '../../../components/OptionToggle';
import styles from './BackgroundField.module.scss';
import ColorPickArea from './ColorPickArea';
import ImagePickArea from './ImagePickArea';

const BackgroundField = ({ formDataChange, setNewImageFileObject }) => {
  const [backgroundType, setBackgroundType] = useState(null);

  return (
    <article className={styles['background-field__container']}>
      <label className={styles['background-field__label']}>배경화면을 선택해주세요.</label>
      <span className={styles['background-field__hint']}>
        컬러를 선택하거나, 이미지를 선택할 수 있습니다.
      </span>
      <OptionToggle onChange={setBackgroundType}>
        <OptionToggle.button label={'컬러'} type={'color'} />
        <OptionToggle.button label={'이미지'} type={'image'} />
      </OptionToggle>
      {backgroundType === 'color' && <ColorPickArea formDataChange={formDataChange} />}
      {backgroundType === 'image' && (
        <ImagePickArea
          formDataChange={formDataChange}
          setNewImageFileObject={setNewImageFileObject}
        />
      )}
    </article>
  );
};

export default BackgroundField;
