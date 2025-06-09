import styles from './ListButtonGroup.module.scss';
import Button from '@/components/Button/Button';
import { useDeviceType } from '@/hooks/useDeviceType';

const ListButtonGroup = ({ showDelete, onClickEdit, onClickPrev, onClickGoList }) => {
  const deviceType = useDeviceType();
  const buttonSize = deviceType !== 'desktop' ? 'stretch' : 'small';

  return (
    <>
      <div className={styles['list__button-group']}>
        <Button size={buttonSize} onClick={onClickGoList}>
          목록으로
        </Button>
        {!showDelete && (
          <Button size={buttonSize} onClick={onClickEdit}>
            편집하기
          </Button>
        )}
        {showDelete && (
          <Button size={buttonSize} onClick={onClickPrev}>
            돌아가기
          </Button>
        )}
      </div>
    </>
  );
};

export default ListButtonGroup;
