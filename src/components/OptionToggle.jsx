import { createContext, useContext, useEffect, useState } from 'react';
import styles from './OptionToggle.module.scss';

const OptionToggleContext = createContext();

const OptionToggle = ({ children }) => {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const firstChild = Array.isArray(children) ? children[0] : children;
    const defaultType = firstChild?.props?.type;
    setSelected(defaultType);
  }, []);

  return (
    <OptionToggleContext.Provider value={{ selected, setSelected }}>
      <div className={styles['container']}>{children}</div>
    </OptionToggleContext.Provider>
  );
};

const OptionButton = ({ label, type }) => {
  const { selected, setSelected } = useContext(OptionToggleContext);

  const selectedButtonStyle = selected === type ? 'selected' : '';

  const handleButtonClick = () => {
    setSelected(type);
  };

  return (
    <button
      className={`${styles['button']} ${styles[selectedButtonStyle]}`}
      onClick={handleButtonClick}
    >
      {label}
    </button>
  );
};

OptionToggle.button = OptionButton;

export default OptionToggle;
