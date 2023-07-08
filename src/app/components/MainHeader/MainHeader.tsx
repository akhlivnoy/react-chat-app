import _ from 'lodash';
import { NavLink } from 'react-router-dom';

import { classNames } from '#utils/classNames';

import { LINKS } from './MainHeader.data';
import styles from './MainHeader.module.scss';

export const MainHeader: React.ComponentType = () => (
  <header className={styles.header}>
    <h3 className={styles.title}>Beyond Codeline</h3>
    <nav className={styles.links}>
      {_.map(LINKS, link => (
        <NavLink
          className={({ isActive }) => classNames(styles.link, isActive && styles.linkActive)}
          key={link.path}
          to={link.path}
        >
          {link.title}
        </NavLink>
      ))}
    </nav>
  </header>
);
