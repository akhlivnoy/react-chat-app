import { Paths } from '#navigation/routes';

import { ILink } from './MainHeader.types';

export const LINKS: ReadonlyArray<ILink> = [
  {
    title: 'Home',
    path: Paths.Root,
  },
  {
    title: 'Login',
    path: Paths.Login,
  },
  {
    title: 'Posts',
    path: Paths.Posts,
    private: true,
  },
];
