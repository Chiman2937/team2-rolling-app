import styles from './ListCard.module.scss';
import plusImg from '@/assets/icons/icon_plus.svg';

const ActionCard = ({ onAction }) => {
  return (
    <article className={styles['card']} onClick={onAction}>
      <button className={`${styles['card__button--add']}`}>
        <img src={plusImg} alt='플러스 아이콘' />
      </button>
    </article>
  );
};

export default ActionCard;
