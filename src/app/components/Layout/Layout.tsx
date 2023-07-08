import { Outlet } from 'react-router-dom';

import { MainHeader } from '#components';

export const Layout: React.ComponentType = () => (
  <div>
    <MainHeader />
    <Outlet />
  </div>
);
