import { Link } from 'react-router-dom';

import { SVG } from '#assets/svg';
import { Paths } from '#navigation/routes';

import styles from './Register.module.scss';

export const RegisterPage: React.ComponentType = () => (
  <div className={styles.container}>
    <h2 className={styles.title}>Chat</h2>
    <h3 className={styles.subtitle}>Register</h3>
    <form
      action="POST"
      className={styles.form}
    >
      <input
        placeholder="Nickname"
        type="text"
      />
      <input
        placeholder="email@mail.com"
        type="email"
      />
      <input
        placeholder="password"
        type="password"
      />
      <label htmlFor="file">
        <input
          hidden
          id="file"
          type="file"
        />
        <SVG.AddAvatar />
        <span>Add an avatar</span>
      </label>
      <button>Sign up</button>
    </form>
    <p className={styles.login}>
      Do you already have an account? <Link to={`${Paths.Root}${Paths.Login}`}>Login</Link>
    </p>
  </div>
);
