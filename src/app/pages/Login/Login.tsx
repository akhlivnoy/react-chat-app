import { useEffect, useState } from 'react';

import { UserList } from '#components';
import { useAppDispatch, useAppSelector } from '#hooks';
import { userSlice } from '#redux/slices';
import { classNames } from '#utils/classNames';

import styles from './Login.module.scss';

export const LoginPage: React.ComponentType = () => {
  // const state = useLocationState<ILoginState>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [index, setIndex] = useState(0);

  const dispatch = useAppDispatch();
  const { user, userList } = useAppSelector(state => state.user);
  const { errors } = useAppSelector(state => state.app);

  useEffect(() => {
    if (!userList?.length) {
      dispatch(userSlice.actions.getUserList({ limit: 10 }));
    }
  }, [dispatch, userList?.length]);

  useEffect(() => {
    if (userList.length) {
      setUsername(userList[index].username);
      setPassword(userList[index].password);
    }
  }, [index, userList]);

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    dispatch(userSlice.actions.loginUser({ username, password }));
  };

  const handleLogout = () => {
    dispatch(userSlice.actions.logout());
  };

  return (
    <div className={styles.container}>
      {user?.token ? (
        <>
          <div className={styles.userInfo}>
            <h2>
              Hello, {user.firstName} {user.lastName}
            </h2>
            <img
              alt="avatar"
              className={styles.image}
              src={user.image}
            />
          </div>
          <button
            className={classNames(styles.input, styles.button)}
            onClick={handleLogout}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <UserList
            className={classNames(styles.input, styles.select)}
            data={userList}
            setIndex={setIndex}
          />
          <input
            className={styles.input}
            placeholder="username"
            type="text"
            value={username}
            onChange={handleChangeName}
          />
          <input
            className={styles.input}
            placeholder="password"
            type="password"
            value={password}
            onChange={handleChangePassword}
          />
          <button
            className={classNames(styles.input, styles.button)}
            onClick={handleLogin}
          >
            Login
          </button>
          {errors.loginUser && <p className={styles.error}>The username or password you entered is incorrect</p>}
        </>
      )}
    </div>
  );
};
