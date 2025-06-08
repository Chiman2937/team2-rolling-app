import styles from './ListButtonGroup.module.scss';

const ListButtonGroup = ({ showDelete, onClickEdit, onClickPrev, onClickGoList }) => {
  return (
    <>
      <div className={styles['list__button-group']}>
        <button className={styles['list__button']} onClick={onClickGoList}>
          목록으로
        </button>
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
