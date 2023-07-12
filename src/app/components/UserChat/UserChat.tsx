import _ from 'lodash';
import moment from 'moment';
import { memo } from 'react';

import { useAppDispatch } from '#hooks';
import { userSlice } from '#redux/slices';
import { classNames } from '#utils/classNames';

import styles from './UserChat.module.scss';
import { IUserChatProps } from './UserChat.types';

const UserChatComponent: React.ComponentType<IUserChatProps> = ({ chatInfo, isActive }) => {
  const dispatch = useAppDispatch();

  const handleSelect = () => {
    dispatch(userSlice.actions.getInterlocutor(_.clone(chatInfo.interlocutorInfo)));
    dispatch(userSlice.actions.clearSearchedUser());
  };

  return (
    <button
      className={classNames(styles.chat, isActive && styles.active)}
      key={chatInfo.interlocutorInfo.uid}
      onClick={handleSelect}
    >
      <img
        alt="avatar"
        src={chatInfo.interlocutorInfo.avatarUrl}
      />
      <div className={styles.chatInfo}>
        <span className={styles.username}>{chatInfo.interlocutorInfo.nickname}</span>
        <span>{moment(chatInfo.lastUpdate).fromNow()}</span>

        <p>{chatInfo.lastMessage}</p>
      </div>
    </button>
  );
};

export const UserChat = memo(UserChatComponent);
