import styles from '@/components/ItemCard.module.scss';
import defaultImg from '@/assets/images/image_profile_default.svg';
import Badge from '@/components/Badge.jsx';
import DeleteIcon from './DeleteIcon';
import plusImg from '@/assets/icons/icon_plus.svg';

const ItemCard = ({ cardData, isAddCard }) => {
  if (isAddCard)
    return (
      <article className={styles['card']}>
        <button className={`${styles['card__button--add']}`}>
          <img src={plusImg} alt='플러스 아이콘' />
        </button>
      </article>
    );

  /* 폰트 확인 후 해당 폰트로 보여줘야 함 */
  const { sender, profileImageURL, relationship, content, createAt } = cardData;

  return (
    <article className={styles['card']}>
      <div className={styles['card__container']}>
        <div className={styles['card__main']}>
          <header className={styles['card__author']}>
            <div className={styles['card__author-content']}>
              <img
                src={profileImageURL ? profileImageURL : defaultImg}
                className={styles['card__author-image']}
                alt='프로필 이미지'
              />
              <div className={styles['card__author-info']}>
                <div className={styles['card__author-text']}>
                  From. <div className={styles['card__author-name']}>{sender}</div>
                </div>
                <Badge relationType={relationship} />
              </div>
            </div>
            <button className={styles['card__button--delete']}>
              <DeleteIcon />
            </button>
          </header>
          <hr className={styles['card__divider']} />
          <section className={styles['card__content']}>{content}</section>
        </div>
        <footer className={styles['card__date']}>{createAt}</footer>
      </div>
    </article>
  );
};

export default ItemCard;
