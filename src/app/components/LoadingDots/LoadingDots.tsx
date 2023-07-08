import { classNames } from '#utils/classNames';

import styles from './LoadingDots.module.scss';

export const LoadingDots: React.ComponentType<React.HTMLAttributes<HTMLDivElement>> = ({ className }) => (
  <span className={classNames(styles.container, className)}>
    <span className={styles.dotFlashing} />
  </span>
);
