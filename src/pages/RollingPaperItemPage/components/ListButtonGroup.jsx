import styles from './ListButtonGroup.module.scss';
import Button from '@/components/Button/Button';
import { useDeviceType } from '@/hooks/useDeviceType';

const ListButtonGroup = ({ showDelete, onClickEdit, onClickPrev, onClickGoList }) => {
  const deviceType = useDeviceType();
  return (
    <>
      <div className={styles['list__button-group']}>
        <Button size={deviceType === 'desktop' ? 'small' : 'stretch'} onClick={onClickGoList}>
          목록으로
        </Button>
        {!showDelete && (
          <Button size={deviceType === 'desktop' ? 'small' : 'stretch'} onClick={onClickEdit}>
            편집하기
          </Button>
        )}
        {showDelete && (
          <Button size={deviceType === 'desktop' ? 'small' : 'stretch'} onClick={onClickPrev}>
            돌아가기
          </Button>
        )}
      </div>
    </>
  );
};

export default ListButtonGroup;
