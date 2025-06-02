import { Children, cloneElement, createContext, useContext, useEffect, useState } from 'react';
import styles from './OptionToggle.module.scss';

const OptionToggleContext = createContext();

const OptionToggle = ({ children, onChange }) => {
  const [selected, setSelected] = useState(null);
  const [indicatorPosition, setIndicatorPosition] = useState(0);

  useEffect(() => {
    const firstChild = Array.isArray(children) ? children[0] : children;
    const defaultType = firstChild?.props?.type;
    setSelected(defaultType);
    onChange?.(defaultType);
  }, [children]);

  const childrenAppendIndex = Children.map(children, (child, index) => {
    return cloneElement(child, { index });
  });

  return (
    <OptionToggleContext.Provider value={{ selected, setSelected, setIndicatorPosition, onChange }}>
      <div className={styles['container']}>
        {childrenAppendIndex}
        <div
          className={styles['indicator']}
          style={{ transform: `translateX(${indicatorPosition}px)` }}
        />
      </div>
    </OptionToggleContext.Provider>
  );
};

const OptionButton = ({ index, label, type }) => {
  const { selected, setSelected, setIndicatorPosition, onChange } = useContext(OptionToggleContext);

  const selectedButtonStyle = selected === type ? 'selected' : '';

  const handleButtonClick = () => {
    setSelected(type);
    setIndicatorPosition(index * 122);
    onChange?.(type);
  };

  return (
    <button className={`${styles['button']}`} onClick={handleButtonClick}>
      <span
        className={`${styles['button-label']}  ${selected === type ? styles[selectedButtonStyle] : ''}`}
      >
        {label}
      </span>
    </button>
  );
};

OptionToggle.button = OptionButton;

export default OptionToggle;
