import React, { useState } from 'react';

import { SVG } from '#assets/svg';
import { useAppSelector } from '#hooks';
import { apiInstance } from '#services/api';

import styles from './Input.module.scss';

export const Input: React.ComponentType = () => {
  const [inputValue, setInputValue] = useState('');

  const { chat } = useAppSelector(state => state.user);

  const sendMessage = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    if (inputValue !== '' && chat) {
      apiInstance.firebase.sendMessage(inputValue, chat.chatUid);
      setInputValue('');
    }
  };

  const onClick = () => {
    if (chat) {
      sendMessage();
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      sendMessage();
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <form
      className={styles.container}
      onSubmit={sendMessage}
    >
      <input
        placeholder="Type something..."
        type="text"
        value={inputValue}
        onChange={onChange}
        onKeyDown={handleKey}
      />
      <div className={styles.sendContainer}>
        <label htmlFor="file">
          <SVG.AddAvatar />
          <input
            hidden
            id="file"
            type="file"
          />
        </label>
        <button onClick={onClick}>Send</button>
      </div>
    </form>
  );
};
