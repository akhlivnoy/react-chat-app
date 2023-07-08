import _ from 'lodash';
import { useEffect, useState } from 'react';

import { useAppParams, useAppSelector } from '#hooks';
import { IPost } from '#models';
import { Paths } from '#navigation/routes';
import { StaticNavigator } from '#services/navigator';
import { Nullable } from '#types/nullable';

import styles from './Post.module.scss';

export const PostPage: React.ComponentType = () => {
  const { postId } = useAppParams();
  const [post, setPost] = useState<Nullable<IPost>>(null);

  const { posts } = useAppSelector(state => state.posts);

  useEffect(() => {
    const tempPost = _.find(posts, item => item.id === Number(postId));

    if (tempPost) {
      setPost(tempPost);
    } else {
      StaticNavigator.navigate(Paths.Posts);
    }
  }, [postId, posts]);

  return (
    post && (
      <div className={styles.container}>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.description}>{post.body}</p>
      </div>
    )
  );
};
