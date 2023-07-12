import { getDatabase, onValue, ref } from 'firebase/database';
import _ from 'lodash';
import { useState } from 'react';

import { UserChat } from '#components';
import { useAppSelector, useMount } from '#hooks';
import { IUserChat } from '#models';
import { FirebasePaths } from '#services/api/types';

import styles from './Chats.module.scss';

export const Chats: React.ComponentType = () => {
  const [userChats, setUserChats] = useState<IUserChat[]>([]);

  const { chat, user } = useAppSelector(state => state.user);
  const { isChatOpened } = useAppSelector(state => state.cache);

  useMount(() => {
    const userChatsRef = ref(getDatabase(), `${FirebasePaths.UserChats}/${user?.uid}`);
    const unsubscribe = onValue(userChatsRef, snapshot => {
      if (snapshot.val()) {
        const chats: IUserChat[] = Object.values(snapshot.val());
        setUserChats(chats.sort((a, b) => +b.lastUpdate - +a.lastUpdate));
      }
    });

    return () => {
      unsubscribe();
    };
  });

  return (
    <div className={styles.container}>
      {_.map(userChats, userChat => (
        <UserChat
          chatInfo={userChat}
          isActive={userChat.chatUid === chat?.chatUid && isChatOpened}
          key={userChat.chatUid}
        />
      ))}
    </div>
  );
};
