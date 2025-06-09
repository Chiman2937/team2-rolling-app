import { useState } from 'react';
import BackgroundField from './components/BackgroundField';
import ReceiverField from './components/ReceiverField';
import styles from './CreateRollingPaperPage.module.scss';
import logoIcon from '@/assets/icons/icon_logo_white.svg';
import backIcon from '@/assets/icons/icon_back.svg';
import { useNavigate } from 'react-router-dom';
import { createRecipient } from '@/apis/recipientsApi';
import LoadingOverlay from '../../components/LoadingOverlay';
import { uploadImageToCloudinary } from '../../apis/syncApi/uploadImageToCloudinary';
import { useToast } from '../../hooks/useToast';
import { uploadColorToCloudinary } from '../../apis/syncApi/uploadColorToCloudinary';

const INITIAL_FORM_DATA = {
  name: null,
  backgroundColor: 'beige',
  backgroundImageURL: null,
};

const CreateRollingPaperPage = () => {
  const { showToast } = useToast();

  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [newImageFileObject, setNewImageFileObject] = useState(null);

  const [isCreatingNewPost, setIsCreatingNewPost] = useState(false);

  const navigate = useNavigate();

  const isSubmitEnable = !!formData.name && !!formData.backgroundImageURL;

  const formDataChange = (key, value) => {
    setFormData((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setIsCreatingNewPost(true);
    try {
      let nextFormData = formData;
      if (newImageFileObject !== null) {
        let uploadedImageUrl;
        if (newImageFileObject?.color) {
          uploadedImageUrl = await uploadColorToCloudinary(newImageFileObject);
        } else {
          uploadedImageUrl = await uploadImageToCloudinary(newImageFileObject);
        }
        if (!uploadedImageUrl) {
          throw new Error('이미지 업로드에 실패했습니다.');
        }
        nextFormData = { ...nextFormData, backgroundImageURL: uploadedImageUrl };
      }
      const createdData = await createRecipient(nextFormData);
      if (!createdData) {
        throw new Error('post 요청에 실패했습니다.');
      }
      navigate(`/post/${createdData.id}`);
    } catch (e) {
      console.error('post 생성 중 오류 발생', e);
      showToast?.({
        type: 'fail',
        message: '롤링페이퍼 생성 요청에 실패했습니다.',
        timer: 2000,
      });
    } finally {
      setIsCreatingNewPost(false);
    }
  };

  const handleGoBackClick = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <section className={styles['post-section']}>
      <ReceiverField formDataChange={formDataChange} />
      <BackgroundField
        formDataChange={formDataChange}
        setNewImageFileObject={setNewImageFileObject}
      />
      <div className={styles['post-section__button-area']}>
        <button
          className={styles['post-section__submit']}
          disabled={!isSubmitEnable}
          onClick={handlePostSubmit}
        >
          <img className={styles['post-section__button-logo']} src={logoIcon} />
          생성하기
        </button>
        <button className={styles['post-section__back']} onClick={handleGoBackClick}>
          <img className={styles['post-section__button-logo']} src={backIcon} />
          뒤로
        </button>
      </div>
      {isCreatingNewPost && <LoadingOverlay description='새로운 롤링페이퍼를 만들고 있어요' />}
    </section>
  );
};

export default CreateRollingPaperPage;
