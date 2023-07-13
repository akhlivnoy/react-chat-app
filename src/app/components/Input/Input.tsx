import React, { useRef, useState } from 'react';

import { SVG } from '#assets/svg';
import { useAppSelector } from '#hooks';
import { apiInstance } from '#services/api';

import styles from './Input.module.scss';

export const Input: React.ComponentType = () => {
  const [image, setImage] = useState<string>('');
  const [inputValue, setInputValue] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const { chat } = useAppSelector(state => state.user);

  const sendMessage = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    if (fileRef.current) {
      const imgFile = fileRef.current.files && fileRef.current.files[0];

      if ((inputValue || imgFile) && chat) {
        apiInstance.firebase.sendMessage(inputValue, chat.chatUid, imgFile);
        setInputValue('');
        setImage('');
        fileRef.current.value = '';
      }
    }
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2 && typeof reader.result === 'string') {
          setImage(reader.result);
        }
      };

      if (file) {
        reader.readAsDataURL(file);
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
          {image && (
            <img
              alt="attachment"
              src={image}
            />
          )}
          <SVG.AddAvatar />
          <input
            ref={fileRef}
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
