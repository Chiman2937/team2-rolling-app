import { COLOR_STYLES } from '@/constants/colorThemeStyle';
import styles from './BackgroundSelectSection.module.scss';
import iconChecked from '@/assets/icons/icon_selected.svg';
import OptionToggle from '@/components/OptionToggle';

const COLOR_KEYS = ['beige', 'purple', 'blue', 'green'];

const BackgroundSelectSection = ({
  backgroundType,
  setBackgroundType,
  selectedIndex,
  setSelectedIndex,
  imageURLs,
}) => {
  // background - 컬러 / 이미지 item 스타일 설정
  const backgroundColors = COLOR_KEYS.map((key) => {
    return {
      backgroundColor: COLOR_STYLES[key].primary,
      border: `1px solid ${COLOR_STYLES[key].border}`,
    };
  });

  const backgroundImages = imageURLs.map((url) => {
    return { backgroundImage: `url(${url})` };
  });

  // 화면에 표시할 backgroundItem(color or image) 설정
  const backgroundItems = {
    color: backgroundColors,
    image: backgroundImages,
  };

  // 아이템 선택 시 overlay 표시 여부 설정
  const useOverlayStyle = {
    color: false,
    image: true,
  };

  // item 선택 이벤트
  const handleItemClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <article className={styles['background-selector']}>
      <label className={styles['background-selector__label']}>배경화면을 선택해주세요.</label>
      <span className={styles['background-selector__label-hint']}>
        컬러를 선택하거나, 이미지를 선택할 수 있습니다.
      </span>
      <OptionToggle onChange={(type) => setBackgroundType(type)}>
        <OptionToggle.button label='컬러' type='color' />
        <OptionToggle.button label='이미지' type='image' />
      </OptionToggle>

      <div className={styles['background-selector__grid']}>
        {backgroundType &&
          backgroundItems[backgroundType].map((backgroundStyles, index) => {
            return (
              <div key={index} className={styles['background-selector__item-wrapper']}>
                <div
                  className={styles['background-selector__item']}
                  style={backgroundStyles}
                  onClick={() => handleItemClick(index)}
                >
                  {selectedIndex === index && useOverlayStyle[backgroundType] && (
                    <div className={styles['background-selector__overlay']} />
                  )}
                </div>
                {selectedIndex === index && (
                  <img className={styles['background-selector__check-icon']} src={iconChecked} />
                )}
              </div>
            );
          })}
      </div>
    </article>
  );
};

export default BackgroundSelectSection;
