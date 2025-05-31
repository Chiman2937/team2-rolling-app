import styles from './Badge.module.scss';

const BADGE_LIST_COLOR = {
  지인: {
    color: '#FF8832',
    backgroundColor: '#FFF0D6',
  },
  동료: {
    color: '#AB57FF',
    backgroundColor: '#F8F0FF',
  },
  가족: {
    color: '#2BA600',
    backgroundColor: '#E4FBDC',
  },
  친구: {
    color: '#00A2FE',
    backgroundColor: '#E2F5FF',
  },
};

const Badge = ({ relationType }) => {
  return (
    <div style={BADGE_LIST_COLOR[relationType]} className={styles['badge']}>
      {relationType}
    </div>
  );
};

export default Badge;
