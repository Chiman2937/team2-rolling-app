import { useEffect, useState } from 'react';
import OptionToggle from '../../components/OptionToggle';
import styles from './CreateRollingPaperPage.module.scss';
import iconChecked from '@/assets/icons/icon_selected.svg';
import { COLOR_STYLES } from '@/constants/colorThemeStyle';
import { usePreloadImage } from '../../hooks/usePreloadImage';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import { getBackgroundImages } from '../../apis/backgroundImagesAPI';
import { createRecipient } from '../../apis/recipientsApi';

const COLOR_KEYS = ['beige', 'purple', 'blue', 'green'];

const CreateRollingPaperPage = () => {
  const [receiver, setReceiver] = useState('');
  const [backgroundType, setBackgroundType] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const navigate = useNavigate();

  // input change event
  const handleInputChange = (e) => setReceiver(e.target.value);

  // Api 호출
  const {
    data: getData,
    // loading: getLoading,
    // error: getError,
  } = useApi(getBackgroundImages, { immediate: true });

  const {
    data: createData,
    // loading: createLoading,
    // error: createError,
    refetch: requestCreateRecipient,
  } = useApi(createRecipient, {}, { immediate: false });

  // background - 컬러 / 이미지 item 스타일 설정
  const backgroundColors = COLOR_KEYS.map((key) => {
    return {
      backgroundColor: COLOR_STYLES[key].primary,
      border: `1px solid ${COLOR_STYLES[key].border}`,
    };
  });

  const backgroundImageURL = getData?.imageUrls || [];

  const backgroundImages = backgroundImageURL.map((url) => {
    return { backgroundImage: `url(${url})` };
  });

  // 페이지 로딩되면 즉시 이미지 로딩
  usePreloadImage(backgroundImageURL);

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

  // post request 보낼 formData 설정
  const formData = {
    team: '2',
    name: receiver,
    backgroundColor: backgroundType === 'color' ? COLOR_KEYS[selectedIndex] : COLOR_KEYS[0],
    backgroundImageURL: backgroundType === 'image' ? backgroundImageURL[selectedIndex] : null,
  };

  //생성하기 버튼 활성화 여부
  const submitEnable = !!receiver && selectedIndex !== -1;

  // item 선택 이벤트
  const handleItemClick = (index) => {
    setSelectedIndex(index);
  };

  //생성하기 버튼 이벤트
  const handleSubmit = async (e) => {
    e.preventDefault();
    await requestCreateRecipient(formData);
    const pageId = createData.id;
    // post/{id} 페이지로 리다이렉트
    navigate(`/post/${pageId}`);
  };

  // 컬러/이미지 토글 state 변경 시 선택한 아이템 index 초기화화
  useEffect(() => {
    setSelectedIndex(-1);
  }, [backgroundType]);

  return (
    <section className={styles['post-section']}>
      <label className={styles['post-section__receiver-label']}>
        To.
        <input
          className={styles['post-section__receiver-input']}
          value={receiver}
          onChange={handleInputChange}
        ></input>
      </label>

      <label className={styles['post-section__background-label']}>배경화면을 선택해주세요.</label>
      <span className={styles['post-section__background-label-int']}>
        컬러를 선택하거나, 이미지를 선택할 수 있습니다.
      </span>

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
                  {selectedIndex === index && useOverlayStyle[backgroundType] && (
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

      <button
        className={styles['post-section__submit']}
        onClick={handleSubmit}
        disabled={!submitEnable}
      >
        생성하기
      </button>
    </section>
  );
};

export default CreateRollingPaperPage;
