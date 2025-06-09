import styles from '@/pages/RollingPaperItemPage/components/ListCard.module.scss';
import DeleteIcon from './DeleteIcon';
import Button from '@/components/Button/Button';
import SenderProfile from '@/components/SenderProfile';
import ContentViewer from '@/components/ContentViewer/ContentViewer';

const ListCard = ({ cardData, showDelete, onClick, onDelete }) => {
  /* 폰트 확인 후 해당 폰트로 보여줘야 함 */
  const { id, sender, profileImageURL, content, createdAt, relationship, font } = cardData;

  const deleteIconStyle = {
    color: 'var(--color-gray-500)',
  };

  const formatDateKRW = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, 0);
    const day = String(date.getDate()).padStart(2, 0);
    return `${year}. ${month}. ${day}`;
  };

  const onClickItemCard = () => {
    onClick({
      sender,
      imageUrl: profileImageURL,
      createdAt: formatDateKRW(createdAt),
      content: content,
      font: font,
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
            {showDelete && (
              <Button
                variant={'outlined'}
                size={'40'}
                iconOnly={true}
                style={deleteIconStyle}
                onClick={onClickDeleteBtn}
              >
                <DeleteIcon />
              </Button>
            )}
          </header>
          <hr className={styles['card__divider']} />
          <section className={styles['card__content']}>
            <ContentViewer content={content} font={font} />
          </section>
        </div>
        <footer className={styles['card__date']}>{formatDateKRW(createdAt)}</footer>
      </div>
    </article>
  );
};

export default ListCard;
