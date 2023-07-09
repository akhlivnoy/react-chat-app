import { SVG } from '#assets/svg';

import styles from './Input.module.scss';

export const Input: React.ComponentType = () => (
  <div className={styles.container}>
    <input
      placeholder="Type something..."
      type="text"
    />
    <div className={styles.sendContainer}>
      <label htmlFor="file">
        <SVG.AddAvatar />
        <input
          hidden
          id="file"
          type="file"
        />
      </label>
      <button>Send</button>
    </div>
  </div>
);
