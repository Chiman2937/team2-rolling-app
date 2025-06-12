import logoIcon from '@/assets/icons/icon_logo_basic.svg';
import styles from './LogoButton.module.scss';
import { Link } from 'react-router-dom';

const LogoButton = () => {
  return (
    <Link to='/' className={styles['button__link']}>
      <div className={styles['button__logo']}>
        <img src={logoIcon} alt='Logo' className={styles['button__logo-icon']} />
        Rolling
      </div>
    </Link>
  );
};

export default LogoButton;
