import _ from 'lodash';

import { LoadingDots } from '#components';

import styles from './UserList.module.scss';
import { IUserListProps } from './UserList.types';

export const UserList: React.ComponentType<IUserListProps> = ({ data, setIndex, className }) => {
  const handleChangeOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIndex(e.target.selectedIndex);
  };

  return (
    <div className={styles.container}>
      {!data.length && <LoadingDots className={styles.loading} />}
      <select
        className={className}
        onChange={handleChangeOption}
      >
        {_.map(data, user => (
          <option key={user.username}>{user.username}</option>
        ))}
      </select>
    </div>
  );
};
