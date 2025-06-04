import { useEffect, useState } from 'react';
import styles from './CreateRollingPaperPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { useApi } from '@/hooks/useApi';
import { getBackgroundImages } from '@/apis/backgroundImagesApi';
import { createRecipient } from '@/apis/recipientsApi';
import ImagePreloader from '@/components/ImagePreloader';
import BackgroundSelectSection from './components/BackgroundSelectSection';
import { COLOR_STYLES } from '@/constants/colorThemeStyle';
import ReceiverInputField from './components/ReceiverInputField';

const COLOR_KEYS = Object.keys(COLOR_STYLES);

const CreateRollingPaperPage = () => {
  const [receiver, setReceiver] = useState('');
  const [backgroundType, setBackgroundType] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const navigate = useNavigate();

  // Api 호출
  const {
    data: getData,
    // loading: getLoading,
    // error: getError,
  } = useApi(getBackgroundImages, { immediate: true });

  const backgroundImageURL = getData?.imageUrls || [];

  const {
    data: createData,
    // loading: createLoading,
    // error: createError,
    refetch: requestCreateRecipient,
  } = useApi(createRecipient, {}, { immediate: false });

  //생성하기 버튼 활성화 여부
  const submitEnable = !!receiver && selectedIndex !== -1;

  //생성하기 버튼 이벤트
  const handleSubmit = async (e) => {
    e.preventDefault();
    // post request 보낼 formData 설정
    const formData = {
      name: receiver,
      backgroundColor: backgroundType === 'color' ? COLOR_KEYS[selectedIndex] : COLOR_KEYS[0],
      backgroundImageURL: backgroundType === 'image' ? backgroundImageURL[selectedIndex] : null,
    };
    await requestCreateRecipient(formData);
    const pageId = createData.id;
    // post/{id} 페이지로 리다이렉트
    navigate(`/post/${pageId}`);
  };

  // 컬러/이미지 토글 state 변경 시 선택한 아이템 index 초기화
  useEffect(() => {
    setSelectedIndex(-1);
  }, [backgroundType]);

  return (
    <section className={styles['post-section']}>
      <ImagePreloader imageUrls={backgroundImageURL} />
      <ReceiverInputField receiver={receiver} setReceiver={setReceiver} />
      <BackgroundSelectSection
        backgroundType={backgroundType}
        setBackgroundType={setBackgroundType}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        imageURLs={backgroundImageURL}
      />

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
