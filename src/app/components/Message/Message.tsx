import moment from 'moment';

import { useAppSelector } from '#hooks';
import { IMessage } from '#models';
import { classNames } from '#utils/classNames';

import styles from './Message.module.scss';

export const Message: React.ComponentType<IMessage> = ({ text, senderId, createdAt, imgUrl }) => {
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
        {imgUrl && (
          <img
            alt="attached"
            src={imgUrl}
          />
        )}
        {text && <p>{text}</p>}
      </div>
    </div>
  );
};
