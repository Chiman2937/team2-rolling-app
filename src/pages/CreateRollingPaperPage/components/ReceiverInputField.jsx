import { useState } from 'react';
import styles from './ReceiverInputField.module.scss';
import Textfield from '@/components/Textfield';

const ReceiverInputField = ({ receiver, setReceiver }) => {
  const [isValid, setIsValid] = useState(null);
  const [messageProps, setMessageProps] = useState({});

  // input change event
  const handleInputChange = (value) => {
    if (!value) {
      setIsValid(false);
      setMessageProps({
        isShow: true,
        text: '이름이 입력되지 않았습니다',
      });
    } else {
      setIsValid(true);
      setMessageProps({
        isShow: false,
        text: '',
      });
    }
    setReceiver(value);
  };

  return (
    <article className={styles['receiver-field']}>
      <label className={styles['receiver-field__label']}>To.</label>
      <Textfield
        value={receiver}
        placeholder='받는 사람 이름을 입력해주세요'
        onChange={handleInputChange}
        isValid={isValid}
        messageProps={messageProps}
      />
    </article>
  );
};

export default ReceiverInputField;
