import { Link } from 'react-router-dom';

import { useAppDispatch } from '#hooks';
import { Paths } from '#navigation/routes';
import { InputType } from '#pages';
import { userSlice } from '#redux/slices';

import styles from './Login.module.scss';

export const LoginPage: React.ComponentType = () => {
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password } = e.target as unknown as Record<InputType, HTMLInputElement>;
    dispatch(
      userSlice.actions.loginUser({
        email: email.value,
        password: password.value,
      }),
    );
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Chat</h2>
      <h3 className={styles.subtitle}>Login</h3>
      <form
        className={styles.form}
        onSubmit={handleSubmit}
      >
        <input
          required
          name={InputType.Email}
          placeholder="email@mail.com"
          type="email"
        />
        <input
          required
          name={InputType.Password}
          placeholder="password"
          type="password"
        />

        <button type="submit">Sign in</button>
      </form>
      <p className={styles.login}>
        Don&apos;t have an account? <Link to={`${Paths.Root}${Paths.Register}`}>Register</Link>
      </p>
    </div>
  );
};
