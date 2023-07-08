import apisauce, { ApisauceInstance } from 'apisauce';

import { postsApi } from './posts';
import { userApi } from './user';

export const apiClient: ApisauceInstance = apisauce.create({
  baseURL: 'https://dummyjson.com/auth/login',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

export const apiInstance = {
  posts: postsApi,
  user: userApi,
};
