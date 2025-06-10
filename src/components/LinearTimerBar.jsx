import styles from './LinearTimerBar.module.scss';

/**
 * LinearTimerBar 컴포넌트
 *
 * 일정한 속도로 게이지가 채워지는 애니메이션을 보여주는 컴포넌트입니다.
 * 총 duration은 `initialSeconds`초이며, 시간 경과에 따라 선형적으로 진행됩니다.
 *
 * @component
 * @param {Object} props - 컴포넌트에 전달되는 props
 * @param {number} props.initialSeconds - 게이지가 채워지는 데 걸리는 총 시간 (초 단위)
 * @returns {JSX.Element} 일정 시간 동안 진행되는 게이지 UI
 */
const LinearTimerBar = ({ className, initialSeconds }) => {
  return (
    <>
      <div className={`${styles['container']} ${className}`}>
        <div className={styles['background']}>
          <div className={styles['progress-before']} />
          <div className={styles['progress']} style={{ '--timer': `${initialSeconds}s` }} />
        </div>
      </div>
    </>
  );
};

export default LinearTimerBar;
