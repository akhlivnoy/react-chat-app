import moment from 'moment';

import { useAppSelector } from '#hooks';
import { IMessage } from '#models';
import { classNames } from '#utils/classNames';

import styles from './Message.module.scss';

export const Message: React.ComponentType<IMessage> = ({ text, senderId, createdAt }) => {
  const { chat, user } = useAppSelector(state => state.user);

  return (
    <div className={classNames(styles.message, user?.uid === senderId && styles.owner)}>
      <div className={styles.info}>
        <img
          alt="avatar"
          src={user?.uid === senderId ? user.avatarUrl : chat?.interlocutorInfo.avatarUrl}
        />
        <span>{moment(createdAt).format('LT')}</span>
      </div>
      <div className={styles.content}>
        {/* <img
          alt="attached"
          src="https://images.pexels.com/photos/16999877/pexels-photo-16999877.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
        /> */}
        <p>{text}</p>
      </div>
    </div>
  );
};
