import { useEffect, useState } from 'react';
import OptionToggle from '../../components/OptionToggle';
import styles from './CreateRollingPaperPage.module.scss';
import iconChecked from '@/assets/icons/icon_selected.svg';

const backgroundColors = [
  { backgroundColor: 'var(--color-beige-200)', border: '1px solid rgb(0,0,0,0.08' },
  { backgroundColor: 'var(--color-purple-200)', border: '1px solid rgb(0,0,0,0.08' },
  { backgroundColor: 'var(--color-blue-200)', border: '1px solid rgb(0,0,0,0.08' },
  { backgroundColor: 'var(--color-green-200)', border: '1px solid rgb(0,0,0,0.08' },
];

const backgroundImages = [
  { backgroundImage: 'url(https://picsum.photos/id/683/3840/2160)' },
  { backgroundImage: 'url(https://picsum.photos/id/24/3840/2160)' },
  { backgroundImage: 'url(https://picsum.photos/id/599/3840/2160)' },
  { backgroundImage: 'url(https://picsum.photos/id/1058/3840/2160)' },
];

const CreateRollingPaperPage = () => {
  const [backgroundType, setBackgroundType] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const backgroundItems = {
    color: backgroundColors,
    image: backgroundImages,
  };

  const useOverlay = {
    color: false,
    image: true,
  };

  const handleItemClick = (index) => {
    setSelectedIndex(index);
  };

  useEffect(() => {
    setSelectedIndex(-1);
  }, [backgroundType]);

  return (
    <section className={styles['post-section']}>
      <label className={styles['label-to']}>
        To.
        <input styles={{ width: '100%' }}></input>
      </label>
      <label className={styles['label-background']}>배경화면을 선택해주세요.</label>
      {backgroundType}
      <OptionToggle onChange={(type) => setBackgroundType(type)}>
        <OptionToggle.button label='컬러' type='color' />
        <OptionToggle.button label='이미지' type='image' />
      </OptionToggle>

      <div className={styles['post-section__backgrounds-wrapper']}>
        {backgroundType &&
          backgroundItems[backgroundType].map((backgroundStyles, index) => {
            return (
              <div key={index} className={styles['post-section__background_container']}>
                <div
                  className={styles['post-section__background-item']}
                  style={backgroundStyles}
                  onClick={() => handleItemClick(index)}
                >
                  {selectedIndex === index && useOverlay[backgroundType] && (
                    <div className={styles['post-section__background-overlay']} />
                  )}
                </div>
                {selectedIndex === index && (
                  <img
                    className={styles['post-section__background-selected-icon']}
                    src={iconChecked}
                  />
                )}
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default CreateRollingPaperPage;
