import { Chats, Navbar, Search } from '#components';

import styles from './Sidebar.module.scss';

export const Sidebar: React.ComponentType = () => (
  <div className={styles.container}>
    <Navbar />
    <Search />
    <Chats />
  </div>
);
