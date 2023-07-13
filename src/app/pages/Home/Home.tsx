import { useEffect, useMemo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { Sidebar } from '#components';
import { useAppDispatch } from '#hooks';
import { cacheSlice } from '#redux/slices';
import { classNames } from '#utils/classNames';

import styles from './Home.module.scss';

export const HomePage: React.ComponentType = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const isChatOpened = useMemo(() => !!location.pathname.match(/\/.+/g), [location.pathname]);

  useEffect(() => {
    dispatch(cacheSlice.actions.setIsChatOpened(isChatOpened));

    // intentionally
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChatOpened]);

  return (
    <div className={classNames(styles.container, !isChatOpened && styles.closed)}>
      <Sidebar />

      <Outlet />
    </div>
  );
};
