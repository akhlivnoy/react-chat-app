import { Outlet } from 'react-router-dom';

export const Layout: React.ComponentType = () => (
  <div className="layout">
    <Outlet />
  </div>
);
