import styles from '@/components/ItemCard.module.scss';
import DeleteIcon from './DeleteIcon';
import plusImg from '@/assets/icons/icon_plus.svg';
import SenderProfile from './SenderProfile';

const ItemCard = ({ cardData, isAddCard, isEditMode }) => {
  if (isAddCard)
    return (
      <article className={styles['card']}>
        <button className={`${styles['card__button--add']}`}>
          <img src={plusImg} alt='플러스 아이콘' />
        </button>
      </article>
    );

  /* 폰트 확인 후 해당 폰트로 보여줘야 함 */
  const { sender, profileImageURL, content, createAt } = cardData;

  return (
    <article className={styles['card']}>
      <div className={styles['card__container']}>
        <div className={styles['card__main']}>
          <header className={styles['card__sender']}>
            <SenderProfile sender={sender} imageUrl={profileImageURL} />
            {isEditMode && (
              <button className={styles['card__button--delete']}>
                <DeleteIcon />
              </button>
            )}
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
