import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '#hooks';
import { Paths } from '#navigation/routes';
import { userSlice } from '#redux/slices';
import { classNames } from '#utils/classNames';

import styles from './Navbar.module.scss';

export const Navbar: React.ComponentType = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.user);
  const { isChatOpened } = useAppSelector(state => state.cache);

  const handleLogout = () => {
    dispatch(userSlice.actions.logout());
  };

  return (
    <div className={styles.container}>
      <Link
        className={classNames(styles.title, isChatOpened && styles.opened)}
        to={Paths.Root}
      >
        Chat
      </Link>
      <div className={styles.user}>
        <img
          alt="avatar"
          src={user?.avatarUrl}
        />
        <span>{user?.nickname}</span>
        <button onClick={handleLogout}>logout</button>
      </div>
    </div>
  );
};
