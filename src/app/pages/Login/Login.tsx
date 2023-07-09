import { Link } from 'react-router-dom';

import { Paths } from '#navigation/routes';

import styles from './Login.module.scss';

export const LoginPage: React.ComponentType = () => (
  <div className={styles.container}>
    <h2 className={styles.title}>Chat</h2>
    <h3 className={styles.subtitle}>Login</h3>
    <form
      action="POST"
      className={styles.form}
    >
      <input
        placeholder="email@mail.com"
        type="email"
      />
      <input
        placeholder="password"
        type="password"
      />

      <button>Sign in</button>
    </form>
    <p className={styles.login}>
      Don&apos;t have an account? <Link to={`${Paths.Root}${Paths.Register}`}>Register</Link>
    </p>
  </div>
);
