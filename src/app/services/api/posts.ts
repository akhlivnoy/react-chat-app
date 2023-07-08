import { ErrorResponse } from '#types/api';

import { apiClient } from '.';
import { ApiGetPostsSuccessResponse } from './types';

const getPosts = async (limit: number) =>
  apiClient.get<ApiGetPostsSuccessResponse, ErrorResponse>('https://dummyjson.com/posts', {
    limit,
  });

export const postsApi = {
  getPosts,
};
