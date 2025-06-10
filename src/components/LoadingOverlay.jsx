import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import styles from './LoadingOverlay.module.scss';

const LoadingOverlay = ({ description = '' }) => {
  return (
    <section className={styles['loading-overlay']}>
      <LoadingSpinner.dotCircle dotCount={12} dotSize={8} distanceFromCenter={40} />
      <span className={styles['loading-overlay__title']}>잠시만 기다려주세요</span>
      <span className={styles['loading-overlay__description']}>{description}</span>
    </section>
  );
};

export default LoadingOverlay;
