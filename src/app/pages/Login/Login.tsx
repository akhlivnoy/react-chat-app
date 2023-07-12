import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '#hooks';
import { Paths } from '#navigation/routes';
import { InputType } from '#pages';
import { appSlice, userSlice } from '#redux/slices';

import styles from './Login.module.scss';

export const LoginPage: React.ComponentType = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const {
    errors: { loginUser: loginUserError },
    loading: { isLoginUser },
  } = useAppSelector(state => state.app);

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

  const onRegisterClick = () => {
    dispatch(appSlice.actions.resetErrors());
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

        {loginUserError && <p className={styles.error}>{t(loginUserError)}</p>}

        <button
          disabled={isLoginUser}
          type="submit"
        >
          Sign in
        </button>
      </form>
      <p className={styles.login}>
        Don&apos;t have an account?{' '}
        <Link
          to={`${Paths.Root}${Paths.Register}`}
          onClick={onRegisterClick}
        >
          Register
        </Link>
      </p>
    </div>
  );
};
