import { Link } from 'react-router-dom';

import { SVG } from '#assets/svg';
import { useAppDispatch } from '#hooks';
import { Paths } from '#navigation/routes';
import { userSlice } from '#redux/slices';

import styles from './Register.module.scss';
import { InputType } from './Register.types';

export const RegisterPage: React.ComponentType = () => {
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { nickname, email, password, file } = e.target as unknown as Record<InputType, HTMLInputElement>;
    dispatch(
      userSlice.actions.registerUser({
        nickname: nickname.value,
        email: email.value,
        password: password.value,
        avatar: file.files && file.files[0],
      }),
    );
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Chat</h2>
      <h3 className={styles.subtitle}>Register</h3>
      <form
        className={styles.form}
        onSubmit={handleSubmit}
      >
        <input
          required
          name={InputType.Nickname}
          placeholder="Nickname"
          type="text"
        />
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
        <label htmlFor="file">
          <input
            hidden
            id="file"
            name={InputType.File}
            type="file"
          />
          <SVG.AddAvatar />
          <span>Add an avatar</span>
        </label>
        <button type="submit">Sign up</button>
      </form>
      <p className={styles.login}>
        Do you already have an account? <Link to={`${Paths.Root}${Paths.Login}`}>Login</Link>
      </p>
    </div>
  );
};
