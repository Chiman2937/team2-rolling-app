import { useState } from 'react';
import styles from './SenderProfile.module.scss';
import DEFAULT_IMAGE_SRC from '@/assets/images/image_profile_default.svg';
import Badge from './Badge';

const SenderProfile = ({ sender, imageUrl = null, createdAt, relationship }) => {
  const [imageValid, setImageValid] = useState(true);

  const handleImageError = () => {
    setImageValid(false);
  };

  return (
    <div className={styles['container']}>
      <img
        className={styles['image']}
        src={imageValid && imageUrl ? imageUrl : DEFAULT_IMAGE_SRC}
        onError={handleImageError}
        width={56}
      />
      <div className={styles['from-container']}>
        <span className={styles['from']}>
          {`From. `}
          <span className={styles['name']}>{sender}</span>
        </span>
        <Badge relationType={relationship} />
      </div>
      <span className={styles['createdAt']}>{createdAt}</span>
    </div>
  );
};

export default SenderProfile;
