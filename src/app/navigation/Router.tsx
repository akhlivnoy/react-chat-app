/* eslint-disable react/no-multi-comp */
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Chat, Layout, RequireAuth } from '#components';
import { HomePage, LoginPage, NotFoundPage, RegisterPage } from '#pages';
import { NavigatorSetter } from '#services/navigator';

import { Params, Paths } from './routes';

export const Router: React.ComponentType = () => (
  <BrowserRouter>
    <NavigatorSetter />
    <Routes>
      <Route
        element={<Layout />}
        errorElement={<NotFoundPage />}
        path={Paths.Root}
      >
        <Route
          element={
            <RequireAuth>
              <HomePage />
            </RequireAuth>
          }
          path={Paths.Root}
        >
          <Route
            element={<Chat />}
            path={`:${Params.ChatId}`}
          />
        </Route>
        <Route
          element={<LoginPage />}
          path={Paths.Login}
        />
        <Route
          element={<RegisterPage />}
          path={Paths.Register}
        />
      </Route>
      <Route
        element={<NotFoundPage />}
        path="*"
      />
    </Routes>
  </BrowserRouter>
);
