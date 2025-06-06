import styles from './ListButtonGroup.module.scss';

const ListButtonGroup = ({
  showDelete,
  onClickEdit,
  onClickDelete,
  onClickPrev,
  onClickGoList,
}) => {
  return (
    <>
      {!showDelete && (
        <div className={styles['list__button-group']}>
          <button className={styles['list__button']} onClick={onClickGoList}>
            목록으로
          </button>
          <button className={styles['list__button']} onClick={onClickEdit}>
            편집하기
          </button>
        </div>
      )}
      {showDelete && (
        <div className={styles['list__button-group']}>
          <button className={styles['list__button']} onClick={onClickPrev}>
            돌아가기
          </button>
          <button className={styles['list__button']} onClick={onClickDelete}>
            저장하기
          </button>
        </div>
      )}
    </>
  );
};

export default ListButtonGroup;
