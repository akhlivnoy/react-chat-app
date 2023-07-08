/* eslint-disable react/no-multi-comp */
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Layout, RequireAuth } from '#components';
import { HomePage, LoginPage, NotFoundPage, PostPage, PostsPage } from '#pages';
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
          index
          element={<HomePage />}
        />
        <Route
          element={<LoginPage />}
          path={Paths.Login}
        />
        <Route
          element={
            <RequireAuth>
              <PostsPage />
            </RequireAuth>
          }
          path={Paths.Posts}
        />
        <Route
          element={<PostPage />}
          path={`${Paths.Posts}/:${Params.PostId}`}
        />
      </Route>
      <Route
        element={<NotFoundPage />}
        path="*"
      />
    </Routes>
  </BrowserRouter>
);
