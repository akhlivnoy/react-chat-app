import { Navigate, useLocation } from 'react-router-dom';

import { useAppSelector } from '#hooks';
import { Paths } from '#navigation/routes';
import { ILoginState } from '#pages';

export const RequireAuth: React.ComponentType<{ children: JSX.Element }> = ({ children }) => {
  const { user } = useAppSelector(state => state.user);
  const location = useLocation();
  const state: ILoginState = {
    from: location,
  };

  return user?.token ? (
    children
  ) : (
    <Navigate
      state={state}
      to={`${Paths.Root}${Paths.Login}`}
    />
  );
};
