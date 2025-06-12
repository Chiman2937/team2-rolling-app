import styles from './ListButtonGroup.module.scss';
import Button from '@/components/Button/Button';
import { useDeviceType } from '@/hooks/useDeviceType';
import BackIcon from './BackIcon';
import EditIcon from './EditIcon';
import CarouselIcon from './CarouselIcon';

const ListButtonGroup = ({ showDelete, onClickEdit, onClickPrev, onClickGoList }) => {
  const deviceType = useDeviceType();
  const buttonSize = deviceType !== 'desktop' ? 'stretch' : 'small';

  return (
    <>
      <div className={styles['list__button-group']}>
        <Button
          size={buttonSize}
          variant={'secondary'}
          onClick={onClickGoList}
          className={styles['list__button']}
        >
          <CarouselIcon />
          목록으로
        </Button>
        {!showDelete && (
          <Button size={buttonSize} onClick={onClickEdit} className={styles['list__button']}>
            <EditIcon />
            편집하기
          </Button>
        )}
        {showDelete && (
          <Button size={buttonSize} onClick={onClickPrev} className={styles['list__button']}>
            <BackIcon /> 돌아가기
          </Button>
        )}
      </div>
    </>
  );
};

export default ListButtonGroup;
