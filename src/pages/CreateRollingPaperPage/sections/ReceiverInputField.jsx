import { useState } from 'react';
import styles from './ReceiverInputField.module.scss';
import Textfield from '../../../components/Textfield';

const ReceiverInputField = ({ receiver, setReceiver }) => {
  const [isEditingReceiver, setIsEditingReceiver] = useState(false);

  // input change event
  const handleInputChange = (value) => {
    setIsEditingReceiver(true);
    setReceiver(value);
  };

  return (
    <article className={styles['receiver-field']}>
      <label className={styles['receiver-field__label']}>To.</label>
      <Textfield
        value={receiver}
        placeholder='받는 사람 이름을 입력해주세요'
        onChange={handleInputChange}
        isError={isEditingReceiver ? receiver === '' : null}
        message='이름이 입력되지 않았습니다'
      />
    </article>
  );
};

export default ReceiverInputField;
