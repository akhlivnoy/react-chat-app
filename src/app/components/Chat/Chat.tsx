import { Input, Messages } from '#components';

import styles from './Chat.module.scss';

export const Chat: React.ComponentType = () => (
  <div className={styles.container}>
    <div className={styles.info}>
      <span>Jane</span>
    </div>
    <Messages />

    <Input />
  </div>
);
