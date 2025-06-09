import { useState } from 'react';
import Textfield from '../../../components/Textfield';
import styles from './ReceiverField.module.scss';

const ReceiverField = ({ formDataChange }) => {
  const [inputValue, setInputValue] = useState('');
  const [isInputValid, setIsInputValid] = useState(null);

  const messageByValid = {
    null: '',
    false: '이름을 입력해주세요',
    true: '',
  };

  const handleInputChange = (value) => {
    setInputValue(value);
    if (!value) {
      setIsInputValid(false);
    } else {
      setIsInputValid(true);
    }
    formDataChange('name', value);
  };

  return (
    <article className={styles['receiver-field__container']}>
      <label htmlFor='receiver-name' className={styles['receiver-field__label']}>
        To.
      </label>
      <Textfield
        id='receiver-name'
        placeholder='받는 사람 이름을 입력해 주세요'
        message={messageByValid[isInputValid]}
        value={inputValue}
        onChange={handleInputChange}
      />
    </article>
  );
};

export default ReceiverField;
