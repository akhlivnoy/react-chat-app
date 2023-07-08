import _ from 'lodash';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { LoadingDots } from '#components';
import { useAppDispatch, useAppSelector } from '#hooks';
import { postsSlice } from '#redux/slices';

import styles from './Posts.module.scss';

export const PostsPage: React.ComponentType = () => {
  const { posts } = useAppSelector(state => state.posts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!posts?.length) {
      dispatch(postsSlice.actions.getPosts({ limit: 25 }));
    }
  }, [dispatch, posts?.length]);

  return (
    <div className={styles.container}>
      {posts?.length ? (
        _.map(posts, post => (
          <Link
            className={styles.link}
            key={post.id}
            to={`${post.id}`}
          >
            {post.id}. {post.title}
          </Link>
        ))
      ) : (
        <LoadingDots className={styles.loadingDots} />
      )}
    </div>
  );
};
