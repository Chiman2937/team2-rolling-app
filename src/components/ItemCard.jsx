import styles from '@/components/ItemCard.module.scss';
import DeleteIcon from './DeleteIcon';
import plusImg from '@/assets/icons/icon_plus.svg';
import SenderProfile from './SenderProfile';

const ItemCard = ({ cardData, isAddCard, isEditMode, onClick, onDelete, onAdd }) => {
  if (isAddCard)
    return (
      <article className={styles['card']} onClick={onAdd}>
        <button className={`${styles['card__button--add']}`}>
          <img src={plusImg} alt='플러스 아이콘' />
        </button>
      </article>
    );

  /* 폰트 확인 후 해당 폰트로 보여줘야 함 */
  const { id, sender, profileImageURL, content, createdAt, relationship } = cardData;
  const formatDate = (date) => {
    return date.slice(0, 10);
  };

  const onClickItemCard = () => {
    onClick({
      sender,
      imageUrl: profileImageURL,
      createdAt: formatDate(createdAt),
      content: content,
    });
  };

  const onClickDeleteBtn = (e) => {
    e.stopPropagation(); // 카드 클릭 방지
    onDelete(id);
  };

  return (
    <article className={styles['card']} onClick={onClickItemCard}>
      <div className={styles['card__container']}>
        <div className={styles['card__main']}>
          <header className={styles['card__sender']}>
            <SenderProfile sender={sender} imageUrl={profileImageURL} relationship={relationship} />
            {isEditMode && (
              <button className={styles['card__button--delete']} onClick={onClickDeleteBtn}>
                <DeleteIcon />
              </button>
            )}
          </header>
          <hr className={styles['card__divider']} />
          <section className={styles['card__content']}>{content}</section>
        </div>
        <footer className={styles['card__date']}>{formatDate(createdAt)}</footer>
      </div>
    </article>
  );
};

export default ItemCard;
