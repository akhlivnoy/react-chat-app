import _ from 'lodash';
import React, { useState } from 'react';

import { useAppDispatch, useAppSelector, useMount } from '#hooks';
import { userSlice } from '#redux/slices';

import styles from './Search.module.scss';

export const Search: React.ComponentType = () => {
  const [searchValue, setSearchValue] = useState('');
  const [inputValue, setInputValue] = useState('');

  const dispatch = useAppDispatch();
  const { searchedUsers } = useAppSelector(state => state.user);

  const handleSearch = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    setSearchValue(inputValue);

    if (inputValue === '') {
      dispatch(userSlice.actions.clearSearchedUser());

      return;
    }

    if (searchValue !== inputValue && inputValue !== '') {
      dispatch(userSlice.actions.searchUser(inputValue));
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useMount(() => {
    dispatch(userSlice.actions.clearSearchedUser());
  });

  return (
    <form
      className={styles.container}
      onSubmit={handleSearch}
    >
      <input
        placeholder="Find a user"
        type="text"
        value={inputValue}
        onChange={onChange}
      />

      {_.map(searchedUsers, user => {
        const onClick = () => {
          setInputValue('');
          setSearchValue('');
          dispatch(userSlice.actions.getInterlocutor(user));
          dispatch(userSlice.actions.clearSearchedUser());
        };

        return (
          <button
            className={styles.chat}
            key={user.uid}
            onClick={onClick}
          >
            <img
              alt="avatar"
              src={user.avatarUrl}
            />
            <div className={styles.chatInfo}>
              <span className={styles.username}>{user.nickname}</span>
            </div>
          </button>
        );
      })}
    </form>
  );
};
