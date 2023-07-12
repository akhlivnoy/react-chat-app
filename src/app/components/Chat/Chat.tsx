import { Link } from 'react-router-dom';

import { SVG } from '#assets/svg';
import { Input, Messages } from '#components';
import { useAppSelector } from '#hooks';
import { Paths } from '#navigation/routes';

import styles from './Chat.module.scss';

export const Chat: React.ComponentType = () => {
  const { chat } = useAppSelector(state => state.user);

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Link to={Paths.Root}>
          <SVG.BackArrow />
        </Link>
        <span>{chat?.interlocutorInfo.nickname}</span>
        <SVG.Options />
      </div>
      <Messages />

      <Input />
    </div>
  );
};
