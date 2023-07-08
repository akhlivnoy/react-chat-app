import { LoadingDots } from '#components';
import { useMount } from '#hooks';
import { Paths } from '#navigation/routes';
import { StaticNavigator } from '#services/navigator';

import styles from './NotFound.module.scss';

export const NotFoundPage: React.ComponentType = () => {
  useMount(() => {
    setTimeout(() => {
      StaticNavigator.navigate(Paths.Root);
    }, 3000);
  });

  return (
    <div className={styles.container}>
      <p className={styles.title}>This page doesn&apos;t exist.</p>
      <p className={styles.loading}>
        Redirecting to the homepage
        <LoadingDots className={styles.loadingDots} />
      </p>
    </div>
  );
};
