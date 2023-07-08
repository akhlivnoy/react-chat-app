import { ApiResponse } from 'apisauce';

import { IPost } from '#models';
import { ErrorResponse } from '#types/api';

export type ApiGetPostsSuccessResponse = {
  posts: IPost[];
  total: number;
  skip: number;
  limit: number;
};

export type ApiGetPostsResponse = ApiResponse<ApiGetPostsSuccessResponse, ErrorResponse>;
