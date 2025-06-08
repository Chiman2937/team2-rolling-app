import styles from './ListCard.module.scss';
import DeleteIcon from './DeleteIcon';
import plusImg from '@/assets/icons/icon_plus.svg';

const ActionCard = ({ onAction, isAdd }) => {
  return (
    <article className={`${styles['card']} ${styles['card--column']}`} onClick={onAction}>
      {!isAdd && (
        <>
          <DeleteIcon className={`${styles['card__icon--delete']}`} />
          <span className={`${styles['card__text--delete']}`}></span>
          게시판 삭제하기
        </>
      )}
      {isAdd && (
        <button className={`${styles['card__button--add']}`}>
          <img src={plusImg} alt='플러스 아이콘' />
        </button>
      )}
    </article>
  );
};

export default ActionCard;
