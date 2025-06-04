// src/components/DropdownButton/DropdownButton.jsx
import React, { useState, useRef, useEffect } from 'react';
import styles from './DropdownButton.module.scss';

function DropdownButton({
  ToggleComponent,
  ListComponent,
  layout = 'column',
  ButtonClassName = '',
  MenuClassName = '',
  onToggle,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const handleToggle = () => {
    setIsOpen((prev) => {
      const next = !prev;
      onToggle && onToggle(next);
      return next;
    });
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
        onToggle && onToggle(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onToggle]);

  // 1) wrapperClass: dropdown + layout modifier + (isOpen ? open modifier : '')
  const wrapperClass = [
    styles.dropdown,
    styles[`dropdown--${layout}`],
    isOpen ? styles['dropdown--open'] : '',
  ]
    .filter(Boolean)
    .join(' ');

  // 2) toggleClass: dropdown__toggle + ButtonClassName
  const toggleClass = [styles['dropdown__toggle'], ButtonClassName].filter(Boolean).join(' ');

  // 3) menuClass: dropdown__menu + MenuClassName
  const menuClass = [styles['dropdown__menu'], MenuClassName].filter(Boolean).join(' ');

  return (
    <div className={wrapperClass} ref={containerRef}>
      <div className={toggleClass} onClick={handleToggle}>
        {ToggleComponent}
      </div>
      <div className={menuClass}>{ListComponent}</div>
    </div>
  );
}

export default DropdownButton;
