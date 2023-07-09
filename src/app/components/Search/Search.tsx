import styles from './Search.module.scss';

export const Search: React.ComponentType = () => (
  <div className={styles.container}>
    <input
      placeholder="Find a user"
      type="text"
    />
  </div>
);
