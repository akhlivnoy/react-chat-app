import { Navigate } from 'react-router-dom';

import { useAppSelector } from '#hooks';
import { Paths } from '#navigation/routes';

export const RequireAuth: React.ComponentType<{ children: JSX.Element }> = ({ children }) => {
  const { user } = useAppSelector(state => state.user);

  return user?.uid ? children : <Navigate to={`${Paths.Root}${Paths.Login}`} />;
};
