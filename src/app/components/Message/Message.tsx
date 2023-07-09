import { classNames } from '#utils/classNames';

import styles from './Message.module.scss';

export const Message: React.ComponentType = () => (
  <div className={classNames(styles.message, styles.owner)}>
    <div className={styles.info}>
      <img
        alt="avatar"
        src="https://images.pexels.com/photos/16999877/pexels-photo-16999877.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
      />
      <span>just now</span>
    </div>
    <div className={styles.content}>
      <p>hello</p>
      <img
        alt="attached"
        src="https://images.pexels.com/photos/16999877/pexels-photo-16999877.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
      />
    </div>
  </div>
);
