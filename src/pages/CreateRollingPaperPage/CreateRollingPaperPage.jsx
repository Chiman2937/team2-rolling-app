import { useState } from 'react';
import OptionToggle from '../../components/OptionToggle';
import styles from './CreateRollingPaperPage.module.scss';
const CreateRollingPaperPage = () => {
  const [bgType, setBgType] = useState(null);
  return (
    <section className={styles['post-section']}>
      <label className={styles['label-to']}>
        To.
        <input styles={{ width: '100%' }}></input>
      </label>
      <label className={styles['label-background']}>배경화면을 선택해주세요.</label>
      {bgType}
      <OptionToggle onChange={(type) => setBgType(type)}>
        <OptionToggle.button label='컬러' type='color' />
        <OptionToggle.button label='이미지' type='image' />
      </OptionToggle>
    </section>
  );
};

export default CreateRollingPaperPage;
