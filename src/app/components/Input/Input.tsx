import React, { useState } from 'react';

import { SVG } from '#assets/svg';
import { useAppSelector } from '#hooks';
import { apiInstance } from '#services/api';

import styles from './Input.module.scss';

export const Input: React.ComponentType = () => {
  const [inputValue, setInputValue] = useState('');
  const [imgFile, setImgFile] = useState<File>();

  const { chat } = useAppSelector(state => state.user);

  const sendMessage = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    if ((inputValue || imgFile) && chat) {
      apiInstance.firebase.sendMessage(inputValue, chat.chatUid, imgFile);
      setInputValue('');
    }
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file) {
        setImgFile(file);
      }
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
      />
      <div className={styles.sendContainer}>
        <label htmlFor="file">
          <SVG.AddAvatar />
          <input
            hidden
            accept="image/*"
            id="file"
            type="file"
            onChange={handleFileSelected}
          />
        </label>
        <button>Send</button>
      </div>
    </form>
  );
};
