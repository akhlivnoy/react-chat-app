import { ErrorResponse } from '#types/api';

import { apiClient } from '.';
import { ApiLoginUserBody, ApiLoginUserSuccessResponse } from './types';

const loginUser = (body: ApiLoginUserBody) =>
  apiClient.post<ApiLoginUserSuccessResponse, ErrorResponse>('https://dummyjson.com/auth/login', body);

const getUserList = (limit: number) =>
  apiClient.get<ApiLoginUserSuccessResponse, ErrorResponse>('https://dummyjson.com/users', {
    select: 'username,password',
    limit,
  });

export const userApi = {
  loginUser,
  getUserList,
};
