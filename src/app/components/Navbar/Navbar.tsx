import { useAppDispatch } from '#hooks';
import { userSlice } from '#redux/slices';

import styles from './Navbar.module.scss';

export const Navbar: React.ComponentType = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(userSlice.actions.logout());
  };

  return (
    <div className={styles.container}>
      <span className={styles.title}>Chat</span>
      <div className={styles.user}>
        <img
          alt="avatar"
          src="https://images.pexels.com/photos/16999877/pexels-photo-16999877.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
        />
        <span>User Name</span>
        <button onClick={handleLogout}>logout</button>
      </div>
    </div>
  );
};
