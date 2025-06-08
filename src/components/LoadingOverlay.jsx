import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import styles from './LoadingOverlay.module.scss';

const LoadingOverlay = ({ description = '' }) => {
  return (
    <section
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: '0',
        left: '0',
        opacity: '0.9',
        backgroundColor: 'var(--color-white)',
        zIndex: '99',
      }}
    >
      <LoadingSpinner.dotCircle dotCount={12} dotSize={8} distanceFromCenter={40} />
      <span className={styles['loading-overlay__title']}>잠시만 기다려주세요</span>
      <span className={styles['loading-overlay__description']}>{description}</span>
    </section>
  );
};

export default LoadingOverlay;
