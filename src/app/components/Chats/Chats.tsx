import styles from './Chats.module.scss';

export const Chats: React.ComponentType = () => (
  <div className={styles.container}>
    <div className={styles.chat}>
      <img
        alt="avatar"
        loading="lazy"
        src="https://images.pexels.com/photos/16999877/pexels-photo-16999877.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
      />
      <div className={styles.chatInfo}>
        <span>Jane</span>
        <p>Just now</p>
      </div>
    </div>
    <div className={styles.chat}>
      <img
        alt="avatar"
        loading="lazy"
        src="https://images.pexels.com/photos/16999877/pexels-photo-16999877.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
      />
      <div className={styles.chatInfo}>
        <span>Jane</span>
        <p>Just now</p>
      </div>
    </div>
    <div className={styles.chat}>
      <img
        alt="avatar"
        loading="lazy"
        src="https://images.pexels.com/photos/16999877/pexels-photo-16999877.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
      />
      <div className={styles.chatInfo}>
        <span>Jane</span>
        <p>Just now</p>
      </div>
    </div>
  </div>
);
