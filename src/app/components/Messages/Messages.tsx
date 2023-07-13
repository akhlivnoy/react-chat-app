import { getDatabase, onValue, ref } from 'firebase/database';
import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';

import { Message } from '#components';
import { useAppSelector } from '#hooks';
import { IMessage } from '#models';
import { FirebasePaths } from '#services/api/types';

import styles from './Messages.module.scss';

export const Messages: React.ComponentType = () => {
  const { chat } = useAppSelector(state => state.user);

  const [messages, setMessages] = useState<IMessage[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([]);
    const messagesRef = ref(getDatabase(), `${FirebasePaths.Chats}/${chat?.chatUid}/${FirebasePaths.Messages}`);
    const unsubscribe = onValue(messagesRef, snapshot => {
      if (_.isObject(snapshot.val())) {
        const messagesSnapshot: IMessage[] = Object.values(snapshot.val());
        setMessages(messagesSnapshot);
      }

      if (_.isNull(snapshot.val())) {
        setMessages([]);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [chat?.chatUid]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.lastElementChild?.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, [messages]);

  return (
    <div
      ref={containerRef}
      className={styles.container}
    >
      {_.map(messages, message => (
        <Message
          key={message.id}
          {...message}
        />
      ))}
    </div>
  );
};
