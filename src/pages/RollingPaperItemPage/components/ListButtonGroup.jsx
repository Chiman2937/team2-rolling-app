import styles from './ListButtonGroup.module.scss';
import Button from '@/components/Button/Button';

const ListButtonGroup = ({ showDelete, onClickEdit, onClickPrev, onClickGoList }) => {
  return (
    <>
      <div className={styles['list__button-group']}>
        <Button onClick={onClickGoList}>목록으로</Button>
        {/* <button
          className={`${styles['list__button']} ${styles['list__button--border']}`}
          onClick={onClickGoList}
        >
          목록으로
        </button> */}
        {!showDelete && (
          <button className={styles['list__button']} onClick={onClickEdit}>
            편집하기
          </button>
        )}
        {showDelete && (
          <button className={styles['list__button']} onClick={onClickPrev}>
            돌아가기
          </button>
        )}
      </div>
    </>
  );
};

export default ListButtonGroup;
