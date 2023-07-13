import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { SVG } from '#assets/svg';
import { useAppDispatch, useAppSelector } from '#hooks';
import { Paths } from '#navigation/routes';
import { appSlice, userSlice } from '#redux/slices';

import styles from './Register.module.scss';
import { InputType } from './Register.types';

export const RegisterPage: React.ComponentType = () => {
  const [avatarImage, setAvatarImage] = useState<string>('');

  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const {
    errors: { registerUser: registerUserError },
    loading: { isRegisterUser },
  } = useAppSelector(state => state.app);

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2 && typeof reader.result === 'string') {
          setAvatarImage(reader.result);
        }
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };

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

  const onLoginClick = () => {
    dispatch(appSlice.actions.resetErrors());
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
          minLength={6}
          name={InputType.Password}
          placeholder="password"
          type="password"
        />
        <label htmlFor="file">
          <input
            hidden
            accept="image/*"
            id="file"
            name={InputType.File}
            type="file"
            onChange={handleFileSelected}
          />
          <SVG.AddAvatar />
          {avatarImage ? (
            <img
              alt="avatar"
              src={avatarImage}
            />
          ) : (
            <span>Add an avatar</span>
          )}
        </label>
        {registerUserError && <p className={styles.error}>{t(registerUserError)}</p>}
        <button
          disabled={isRegisterUser}
          type="submit"
        >
          Sign up
        </button>
      </form>
      <p className={styles.login}>
        Do you already have an account?{' '}
        <Link
          to={`${Paths.Root}${Paths.Login}`}
          onClick={onLoginClick}
        >
          Login
        </Link>
      </p>
    </div>
  );
};
