import { Chats, Navbar, Search } from '#components';
import { useAppSelector } from '#hooks';
import { classNames } from '#utils/classNames';

import styles from './Sidebar.module.scss';

export const Sidebar: React.ComponentType = () => {
  const { isChatOpened } = useAppSelector(state => state.cache);

  return (
    <div className={classNames(styles.container, isChatOpened && styles.hide)}>
      <Navbar />
      <div className={styles.content}>
        <Search />
        <Chats />
      </div>
    </div>
  );
};
