import { Chat, Sidebar } from '#components';

import styles from './Home.module.scss';

export const HomePage: React.ComponentType = () => (
  <div className={styles.container}>
    <Sidebar />
    <Chat />
  </div>
);
